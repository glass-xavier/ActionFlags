# Action Flags!

Action Flags! is a keyframe logging application created with [Electron](https://www.electronjs.org/) and the [Electron Forge](https://www.electronforge.io/) toolkit.

## How to:
Once the application is launched, click the "Start Flagging" button to start recording timestamps. Every time the spacebar is pressed, a "flag" (timestamp) is created in a `hh:mm:ss.ms` format, relative to the start time recorded.
When the "Stop Flagging" button has been clicked, a final flag is recorded and the user is prompted to save a file. The filename is populated with the current date, and saved as a `.txt` file.

## Potential use cases:
Flagging moments during a video recording that need to be reviewed during editing.

This application is open source under the [MIT Licence](https://opensource.org/license/mit/) and available to fork or assist with development.

## TODOs:
Fix the window size, it doesn't need to be huge for an app with few elements in GUI.
Add an element that displays the last flag time recorded.
Allow the use of more keys to record flags.
Add categories for different types of flags.
Save key/category configurations in a profile.
Fix build for MacOS (make is throwing a powershell error, cannot create full zip)
