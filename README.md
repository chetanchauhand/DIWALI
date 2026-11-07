# Diwali Celebration 

A personalised, interactive Diwali site in plain HTML, CSS and JavaScript (no frameworks, no build step).

## Run
Open `index.html` in a browser, or serve the folder: `python3 -m http.server 8000` and visit http://localhost:8000.
(Serving over http/https is recommended so clipboard and share features work.)

## Music
Add your own **licensed or royalty-free** MP3 at `assets/audio/diwali-music.mp3`. Do not use copyrighted songs without permission.
If the file is missing, the player shows a friendly message instead of failing.

## Images
Photos load from loremflickr.com (keyword-based Flickr images) and need an internet connection. Any image that fails falls back to a built-in diya illustration.
To use your own pictures, put them in `assets/images/` and change the `src` values in the data arrays at the top of `script.js`.

## Features
Name-gated welcome screen, six tabs, carousel, music player, searchable sweets gallery with modal, 7-chapter bilingual Ramayana with Deepotsav gallery, 30-second digital fireworks game (best score in localStorage), traditions, and a wish editor with copy/share.

## Sweet photos
Mithai Mahal loads real photos from Wikipedia's REST API (`en.wikipedia.org/api/rest_v1/page/summary/<title>`), with credit in the footer. Titles are in the `WIKI` map in `script.js`. If a sweet has no photo or the request fails, it falls back to a keyword photo, then to a diya illustration. To pin an exact image, set that sweet's `src` yourself.
