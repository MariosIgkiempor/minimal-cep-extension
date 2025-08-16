// Polyfill for JSON to return stringified JSON to the client
//@include "./json2.js"

function openDocument(path) {
  app.open(new File(path));
}

function getActiveDocument() {
  if (!app || !app.activeDocument) {
    return null;
  }

  const docData = {
    name: app.activeDocument.name,
    path: app.activeDocument.fullName.toString(),
  };

  return JSON.stringify(docData);
}

function saveActiveDocument() {
  if (!app || !app.activeDocument) {
    return;
  }

  app.activeDocument.save();
}