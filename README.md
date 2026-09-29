# NearWell Greenwich Static Site

This is a host-ready static website for NearWell with:

- `index.html` for the homepage
- `demo.html` for the demo request page
- `styles.css` for base components
- `theme.css` for the shared homepage and demo visual theme
- `script.js` for tabs, popup, slider, chips, and local form behavior

## Notes

- No Python server or app server is required for the site code itself.
- You can open `index.html` directly or upload the folder contents to hosting on `dannyyavo.com`.
- Form submissions are currently saved in `localStorage` so the full UI works in a static environment.
- Before production lead capture, connect the forms to a real service such as your hosting provider's form handler, Formspree, Basin, or a custom endpoint.

## Suggested upload structure

If you want this at a subpath, upload these files into something like:

`dannyyavo.com/nearwell/`

Then the public pages would be:

- `/nearwell/`
- `/nearwell/demo.html`
