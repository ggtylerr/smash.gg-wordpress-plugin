# smash.gg-wordpress-plugin
A Wordpress plugin that adds a Glutenberg block for smash.gg

## Installation
1. Download the repo
   - You can do this by pressing the green "Code" button and selecting "Download ZIP"
2. Upload it to your site
   - You can do this using multiple methods
   - If you have direct access to the filesystem of your Wordpress server, you can make a new folder named "smash-gg-plugin" in `wp-content/plugins`, then upload all the files from the zip to there.
   - You can also upload the zip file as a plugin by going to the admin dashboard, adding a new plugin, and pressing "Upload plugin"
3. Activate the plugin
4. Configure
   - This plugin requires an API key from smash.gg, which you can get [here.](https://smash.gg/admin/profile/developer)
   - Once you have that, on the admin dashboard go to Settings, smash.gg plugin, and paste in your API key there. And save. Obviously.
5. Use it in a post
   - The block is located under "Embeds" and is named "smash.gg"
   - ***NOTE: AT IT'S CURRENT STATE, THIS PLUGIN DOESN'T DO JACK SHIT.*** The most you can do at the moment is place the block down, try and input something, then convert it to HTML. Since for some reason this thing doesn't save properly.
6. ???
7. Profit!

## Stuff that's been added so far
* Basic plugin info and whatnot
* Settings (although it's pretty scuffed)
* The block itself (although it's pretty scuffed)

## Stuff that needs to be done
* Proper saving of the block
* POST/GET requests to smash.gg's API
* Actual output of the request
* Stylization of said output
* Possibly dynamic requests (?)
* **Basically everything.**

## License
This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program; if not, write to the Free Software Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
