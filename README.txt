WHAT FILLS THE DISTANCE BETWEEN US — EDITABLE VERSION

This version adds a private editor, online shared saving, design controls, new notes/pages, and photo memories.

IMPORTANT: This is a Netlify project that needs a build/deploy which publishes its Netlify Function. It is not ready for live shared editing until it is deployed with the function and the SCRAPBOOK_EDIT_PASSWORD environment variable is set in the Netlify project settings (Functions scope). Do not put the password in this folder or share it in chat.

Deploy this project folder through Netlify while signed in so Netlify can run the npm install build command and package the function. If Netlify's manual deploy dropzone does not build the function for this project, a Git-connected deploy or Netlify CLI/API deploy will be needed.

After deploying, in Netlify project settings add an environment variable named SCRAPBOOK_EDIT_PASSWORD, set its value to a private passphrase, make sure its scope includes Functions, then redeploy. The password is checked server-side; it is not stored in the public page.

The public scrapbook reads saved changes from Netlify Blobs. The editor has Words, Design, and Add to it tabs.
