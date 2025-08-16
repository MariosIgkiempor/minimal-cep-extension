# Minimal Adobe CEP Extension

This is a minimal Adobe CEP (Common Extensibility Platform) extension skeleton that includes the bare minimum components needed to create an Adobe CEP extension for Illustrator.

This extension serves as a starting point and demonstrates the basic structure and files required for CEP development. For a detailed explanation of this setup, see the accompanying [blog article](PLACEHOLDER_LINK_TO_ARTICLE)

## Additional information

- [Adobe CEP documentation](https://github.com/Adobe-CEP/CEP-Resources/tree/master/CEP_12.x)
- [JSX reference](https://ai-scripting.docsforadobe.dev)
- [Illustrator Javascript API reference](https://yearbook.github.io/esdocs/#/Illustrator/Application)

## How to get started on Mac

Clone the repository on your machine.

**Read the `CSXS/manifest.xml` file** and modify it to suit your needs.

Run `pnpm run project-setup`.

Then you will be able to access the debugging interface by navigating to:

- Frontend: http://localhost:8705/
- Backend: http://localhost:8805/

To see logs of what's happening inside Illustrator, run:
`tail -f ~/Library/Logs/CSXS/*.log`

If this is the first time you have installed Adobe Illustrator - **restart your machine** or else debugging will not work!

You can now start Illustrator.

Activate the plugin by clicking on the menu `Window > Extensions > My Extension`.

Every time you make a change to the web application that runs inside the Illustrator plugin, you need to either of the following:

- Click on the little refresh icon at the top left corner of the Illustrator debug window inside your web browser.
- Quit Illustrator and reopen it to see the updated plugin.

If you make any changes to the files located in the `jsx` folder, you need to restart Illustrator for your changes to take effect.

Note that the extension folder location is different depending on which OS you use. See [CEP Cookbook](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_8.x/Documentation/CEP%208.0%20HTML%20Extension%20Cookbook.md#extension-folders) for more details.
