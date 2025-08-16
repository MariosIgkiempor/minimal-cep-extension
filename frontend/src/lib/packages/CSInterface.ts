// TypeScript Translation of CSInterface - v12.0.0
// Original Source: https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_12.x/CSInterface.js

// Window types supported by CSXS infrastructure
export enum CSXSWindowType {
  PANEL = "Panel",
  MODELESS = "Modeless",
  MODAL_DIALOG = "ModalDialog",
}

export const EvalScript_ErrMessage = "EvalScript error.";

export class Version {
  static MAX_NUM = 999999999;
  constructor(
    public major: number,
    public minor: number,
    public micro: number,
    public special: string,
  ) {}
}

export class VersionBound {
  constructor(
    public version: Version,
    public inclusive: boolean,
  ) {}
}

export class VersionRange {
  constructor(
    public lowerBound: VersionBound,
    public upperBound: VersionBound | null,
  ) {}
}

export class Runtime {
  constructor(
    public name: string,
    public versionRange: VersionRange,
  ) {}
}

export class Extension {
  constructor(
    public id: string,
    public name: string,
    public mainPath: string,
    public basePath: string,
    public windowType: CSXSWindowType,
    public width: number,
    public height: number,
    public minWidth: number,
    public minHeight: number,
    public maxWidth: number,
    public maxHeight: number,
    public defaultExtensionDataXml: string,
    public specialExtensionDataXml: string,
    public requiredRuntimeList: Runtime[],
    public isAutoVisible: boolean,
    public isPluginExtension: boolean,
  ) {}
}

export class CSEvent {
  public data = "";
  constructor(
    public type: string,
    public scope: string,
    public appId: string,
    public extensionId: string,
  ) {}
}

export enum SystemPath {
  USER_DATA = "userData",
  COMMON_FILES = "commonFiles",
  MY_DOCUMENTS = "myDocuments",
  APPLICATION = "application", // Deprecated
  EXTENSION = "extension",
  HOST_APPLICATION = "hostApplication",
}

export enum ColorType {
  RGB = "rgb",
  GRADIENT = "gradient",
  NONE = "none",
}

export class RGBColor {
  constructor(
    public red: number,
    public green: number,
    public blue: number,
    public alpha = 255.0,
  ) {}
}

export class Direction {
  constructor(
    public x: number,
    public y: number,
  ) {}
}

export class GradientStop {
  constructor(
    public offset: number,
    public rgbColor: RGBColor,
  ) {}
}

export class GradientColor {
  constructor(
    public type: "linear",
    public direction: Direction,
    public numStops: number,
    public arrGradientStop: GradientStop[],
  ) {}
}

export class UIColor {
  constructor(
    public type: number,
    public antialiasLevel: number,
    public color: RGBColor | GradientColor,
  ) {}
}

export class AppSkinInfo {
  constructor(
    public baseFontFamily: string,
    public baseFontSize: string,
    public appBarBackgroundColor: UIColor,
    public panelBackgroundColor: UIColor,
    public appBarBackgroundColorSRGB: UIColor,
    public panelBackgroundColorSRGB: UIColor,
    public systemHighlightColor: RGBColor,
  ) {}
}

export class HostEnvironment {
  constructor(
    public appName: string,
    public appVersion: string,
    public appLocale: string,
    public appUILocale: string,
    public appId: string,
    public isAppOnline: boolean,
    public appSkinInfo: AppSkinInfo,
  ) {}
}

export class HostCapabilities {
  constructor(
    public EXTENDED_PANEL_MENU: boolean,
    public EXTENDED_PANEL_ICONS: boolean,
    public DELEGATE_APE_ENGINE: boolean,
    public SUPPORT_HTML_EXTENSIONS: boolean,
    public DISABLE_FLASH_EXTENSIONS: boolean,
  ) {}
}

export class ApiVersion {
  constructor(
    public major: number,
    public minor: number,
    public micro: number,
  ) {}
}

export class MenuItemStatus {
  constructor(
    public menuItemLabel: string,
    public enabled: boolean,
    public checked: boolean,
  ) {}
}

export class ContextMenuItemStatus {
  constructor(
    public menuItemID: string,
    public enabled: boolean,
    public checked: boolean,
  ) {}
}

export class CSInterface {
  static THEME_COLOR_CHANGED_EVENT = "com.adobe.csxs.events.ThemeColorChanged";

  hostEnvironment: HostEnvironment | null = window.__adobe_cep__
    ? JSON.parse(window.__adobe_cep__.getHostEnvironment())
    : null;

  getHostEnvironment(): HostEnvironment {
    this.hostEnvironment = JSON.parse(window.__adobe_cep__.getHostEnvironment());
    return this.hostEnvironment;
  }

  loadBinAsync(urlName: string, callback?: () => void): boolean {
    try {
      const xhr = new XMLHttpRequest();
      xhr.responseType = "arraybuffer";
      xhr.open("GET", urlName, true);
      xhr.onerror = () => {
        console.log("Unable to load snapshot from given URL");
      };
      xhr.send();
      xhr.onload = () => {
        window.__adobe_cep__.loadSnapshot(xhr.response);
        if (callback) callback();
      };
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  loadBinSync(pathName: string): boolean {
    try {
      const OSVersion = this.getOSInformation();
      if (pathName.startsWith("file://")) {
        if (OSVersion.includes("Windows")) {
          pathName = pathName.replace("file:///", "");
        } else if (OSVersion.includes("Mac")) {
          pathName = pathName.replace("file://", "");
        }
        window.__adobe_cep__.loadSnapshot(pathName);
        return true;
      }
    } catch (err) {
      console.log(err);
    }
    return false;
  }

  closeExtension(): void {
    window.__adobe_cep__.closeExtension();
  }

  getSystemPath(pathType: SystemPath): string {
    let path = decodeURI(window.__adobe_cep__.getSystemPath(pathType));
    const OSVersion = this.getOSInformation();
    if (OSVersion.includes("Windows")) {
      path = path.replace("file:///", "");
    } else if (OSVersion.includes("Mac")) {
      path = path.replace("file://", "");
    }
    return path;
  }

  evalScript(script: string, callback: (result: string) => void = () => {}): void {
    window.__adobe_cep__.evalScript(script, callback);
  }

  getApplicationID(): string {
    return this.hostEnvironment?.appId ?? "";
  }

  getHostCapabilities(): HostCapabilities {
    return JSON.parse(window.__adobe_cep__.getHostCapabilities());
  }

  dispatchEvent(event: CSEvent): void {
    if (typeof event.data === "object") {
      event.data = JSON.stringify(event.data);
    }
    window.__adobe_cep__.dispatchEvent(event);
  }

  addEventListener(type: string, listener: Function, obj?: object): void {
    window.__adobe_cep__.addEventListener(type, listener, obj);
  }

  removeEventListener(type: string, listener: Function, obj?: object): void {
    window.__adobe_cep__.removeEventListener(type, listener, obj);
  }

  requestOpenExtension(extensionId: string, params: string): void {
    window.__adobe_cep__.requestOpenExtension(extensionId, params);
  }

  getExtensions(extensionIds?: string[]): Extension[] {
    const extensionIdsStr = JSON.stringify(extensionIds);
    const extensionsStr = window.__adobe_cep__.getExtensions(extensionIdsStr);
    return JSON.parse(extensionsStr);
  }

  getNetworkPreferences(): any {
    return JSON.parse(window.__adobe_cep__.getNetworkPreferences());
  }

  initResourceBundle(): Record<string, string> {
    const resourceBundle = JSON.parse(window.__adobe_cep__.initResourceBundle());
    const resElms = document.querySelectorAll("[data-locale]");
    for (let i = 0; i < resElms.length; i++) {
      const resEl = resElms[i] as HTMLElement;
      const resKey = resEl.getAttribute("data-locale");
      if (resKey) {
        for (const key in resourceBundle) {
          if (key.startsWith(resKey)) {
            const resValue = resourceBundle[key];
            if (key.length === resKey.length) {
              resEl.innerHTML = resValue;
            } else if (key.charAt(resKey.length) === ".") {
              const attrKey = key.substring(resKey.length + 1);
              (resEl as any)[attrKey] = resValue;
            }
          }
        }
      }
    }
    return resourceBundle;
  }

  dumpInstallationInfo(): string {
    return window.__adobe_cep__.dumpInstallationInfo();
  }

  getOSInformation(): string {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;

    if (platform === "Win32" || platform === "Windows") {
      let version = "Windows";
      const bitness =
        userAgent.includes("WOW64") || userAgent.includes("Win64") ? " 64-bit" : " 32-bit";
      if (userAgent.includes("Windows NT 10")) version = "Windows 10";
      else if (userAgent.includes("Windows NT 6.3")) version = "Windows 8.1";
      else if (userAgent.includes("Windows NT 6.2")) version = "Windows 8";
      else if (userAgent.includes("Windows NT 6.1")) version = "Windows 7";
      else if (userAgent.includes("Windows NT 6.0")) version = "Windows Vista";
      else if (userAgent.includes("Windows NT 5.2")) version = "Windows Server 2003";
      else if (userAgent.includes("Windows NT 5.1")) version = "Windows XP";
      else if (userAgent.includes("Windows NT 5.0")) version = "Windows 2000";
      return version + bitness;
    } else if (platform === "MacIntel" || platform === "Macintosh") {
      let result = "Mac OS X";
      if (userAgent.includes("Mac OS X")) {
        result = userAgent.substring(userAgent.indexOf("Mac OS X"), userAgent.indexOf(")"));
        result = result.replace(/_/g, ".");
      }
      return result;
    }

    return "Unknown Operation System";
  }

  openURLInDefaultBrowser(url: string): number {
    return cep.util.openURLInDefaultBrowser(url);
  }

  getExtensionID(): string {
    return window.__adobe_cep__.getExtensionId();
  }

  getScaleFactor(): number {
    return window.__adobe_cep__.getScaleFactor();
  }

  getMonitorScaleFactor?(): number {
    if (navigator.appVersion.toLowerCase().includes("windows")) {
      return window.__adobe_cep__.getMonitorScaleFactor();
    }
    return -1;
  }

  setScaleFactorChangedHandler(handler: () => void): void {
    window.__adobe_cep__.setScaleFactorChangedHandler(handler);
  }

  getCurrentApiVersion(): ApiVersion {
    return JSON.parse(window.__adobe_cep__.getCurrentApiVersion());
  }

  setPanelFlyoutMenu(menu: string): void {
    if (typeof menu === "string") {
      window.__adobe_cep__.invokeSync("setPanelFlyoutMenu", menu);
    }
  }

  updatePanelMenuItem(menuItemLabel: string, enabled: boolean, checked: boolean): boolean {
    if (!this.getHostCapabilities().EXTENDED_PANEL_MENU) return false;
    const itemStatus = new MenuItemStatus(menuItemLabel, enabled, checked);
    return window.__adobe_cep__.invokeSync("updatePanelMenuItem", JSON.stringify(itemStatus));
  }

  setContextMenu(menu: string, callback: (menuId: string) => void): void {
    if (typeof menu === "string") {
      window.__adobe_cep__.invokeAsync("setContextMenu", menu, callback);
    }
  }

  setContextMenuByJSON(menu: string, callback: (menuId: string) => void): void {
    if (typeof menu === "string") {
      window.__adobe_cep__.invokeAsync("setContextMenuByJSON", menu, callback);
    }
  }

  updateContextMenuItem(menuItemID: string, enabled: boolean, checked: boolean): boolean {
    const itemStatus = new ContextMenuItemStatus(menuItemID, enabled, checked);
    return window.__adobe_cep__.invokeSync("updateContextMenuItem", JSON.stringify(itemStatus));
  }

  isWindowVisible(): boolean {
    return window.__adobe_cep__.invokeSync("isWindowVisible", "");
  }

  resizeContent(width: number, height: number): void {
    window.__adobe_cep__.resizeContent(width, height);
  }

  registerInvalidCertificateCallback(callback: () => void): void {
    window.__adobe_cep__.registerInvalidCertificateCallback(callback);
  }

  registerKeyEventsInterest(keyEventsInterest: string): void {
    window.__adobe_cep__.registerKeyEventsInterest(keyEventsInterest);
  }

  setWindowTitle(title: string): void {
    window.__adobe_cep__.invokeSync("setWindowTitle", title);
  }

  getWindowTitle(): string {
    return window.__adobe_cep__.invokeSync("getWindowTitle", "");
  }
}
