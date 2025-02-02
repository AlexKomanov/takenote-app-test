"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// tests/load-testing/add-note.ts
var add_note_exports = {};
__export(add_note_exports, {
  config: () => config,
  scenarios: () => scenarios
});
module.exports = __toCommonJS(add_note_exports);
var config = {
  target: "https://takenote.dev/app",
  phases: [
    {
      duration: "5s",
      arrivalRate: 1,
      rampTo: 2,
      name: "testing"
    }
  ],
  engines: {
    playwright: {}
  }
};
var scenarios = [{
  engine: "playwright",
  testFunction: helloWorld
}];
async function helloWorld(page) {
  await page.goto("https://takenote.dev/app");
  await page.getByTestId("sidebar-action-create-new-note").click();
  await page.locator(".CodeMirror-scroll").click();
  await page.getByRole("textbox").fill("This is a simple note.\nIt contains multiple lines.\nNo special formatting.");
  await page.getByTestId("topbar-action-sync-notes").click();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  config,
  scenarios
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vYWRkLW5vdGUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IFBhZ2UgfSBmcm9tICdAcGxheXdyaWdodC90ZXN0JztcblxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IHtcbiAgICB0YXJnZXQ6ICdodHRwczovL3Rha2Vub3RlLmRldi9hcHAnLFxuICAgIHBoYXNlczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBkdXJhdGlvbjogJzVzJyxcbiAgICAgICAgICAgIGFycml2YWxSYXRlOiAxLFxuICAgICAgICAgICAgcmFtcFRvOiAyLFxuICAgICAgICAgICAgbmFtZTogJ3Rlc3RpbmcnXG4gICAgICAgIH0sXG4gICAgXSxcbiAgICBlbmdpbmVzOiB7XG4gICAgICAgIHBsYXl3cmlnaHQ6IHt9XG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHNjZW5hcmlvcyA9IFt7XG4gICAgZW5naW5lOiAncGxheXdyaWdodCcsXG4gICAgdGVzdEZ1bmN0aW9uOiBoZWxsb1dvcmxkXG59XTtcblxuYXN5bmMgZnVuY3Rpb24gaGVsbG9Xb3JsZChwYWdlOiBQYWdlKSB7XG4gICAgYXdhaXQgcGFnZS5nb3RvKCdodHRwczovL3Rha2Vub3RlLmRldi9hcHAnKTtcbiAgICBhd2FpdCBwYWdlLmdldEJ5VGVzdElkKCdzaWRlYmFyLWFjdGlvbi1jcmVhdGUtbmV3LW5vdGUnKS5jbGljaygpO1xuICAgIGF3YWl0IHBhZ2UubG9jYXRvcignLkNvZGVNaXJyb3Itc2Nyb2xsJykuY2xpY2soKTtcbiAgICBhd2FpdCBwYWdlLmdldEJ5Um9sZSgndGV4dGJveCcpLmZpbGwoJ1RoaXMgaXMgYSBzaW1wbGUgbm90ZS5cXG5JdCBjb250YWlucyBtdWx0aXBsZSBsaW5lcy5cXG5ObyBzcGVjaWFsIGZvcm1hdHRpbmcuJyk7XG4gICAgYXdhaXQgcGFnZS5nZXRCeVRlc3RJZCgndG9wYmFyLWFjdGlvbi1zeW5jLW5vdGVzJykuY2xpY2soKTtcbn0iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVPLElBQU0sU0FBUztBQUFBLEVBQ2xCLFFBQVE7QUFBQSxFQUNSLFFBQVE7QUFBQSxJQUNKO0FBQUEsTUFDSSxVQUFVO0FBQUEsTUFDVixhQUFhO0FBQUEsTUFDYixRQUFRO0FBQUEsTUFDUixNQUFNO0FBQUEsSUFDVjtBQUFBLEVBQ0o7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNMLFlBQVksQ0FBQztBQUFBLEVBQ2pCO0FBQ0o7QUFFTyxJQUFNLFlBQVksQ0FBQztBQUFBLEVBQ3RCLFFBQVE7QUFBQSxFQUNSLGNBQWM7QUFDbEIsQ0FBQztBQUVELGVBQWUsV0FBVyxNQUFZO0FBQ2xDLFFBQU0sS0FBSyxLQUFLLDBCQUEwQjtBQUMxQyxRQUFNLEtBQUssWUFBWSxnQ0FBZ0MsRUFBRSxNQUFNO0FBQy9ELFFBQU0sS0FBSyxRQUFRLG9CQUFvQixFQUFFLE1BQU07QUFDL0MsUUFBTSxLQUFLLFVBQVUsU0FBUyxFQUFFLEtBQUssNkVBQTZFO0FBQ2xILFFBQU0sS0FBSyxZQUFZLDBCQUEwQixFQUFFLE1BQU07QUFDN0Q7IiwKICAibmFtZXMiOiBbXQp9Cg==
