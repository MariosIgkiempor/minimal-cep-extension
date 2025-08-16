var csInterface = new CSInterface();

const extensions = csInterface.getExtensions();
const extensionIds = extensions
  .filter(({ id }) => id.includes("com.myextension"))
  .map(({ id }) => id);

const EXPECTED_NUMBER_OF_EXTENSIONS = 2;
if (extensionIds.length < EXPECTED_NUMBER_OF_EXTENSIONS) {
  console.error(
    "myextension extension not found. Please ensure the myextension extension is installed.",
    "This can be caused by <Geometry> being omitted from the manifest.xml causing custom UIs to fails silently.",
    "See extensions below:",
    { extensions }
  );
}

csInterface.requestOpenExtension("com.myextension.server", "");

console.log("Adobe Illustrator Extension Interface Loaded");
