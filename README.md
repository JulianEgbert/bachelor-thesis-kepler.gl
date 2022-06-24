# bachelor-thesis-kepler.gl

This repository provides a webpage that can dynamically load the visualizations from kepler.gl. It also injects a valid mapbox key into the HTML files which is why they don't work on their own.

## How to use

### Loading a file

**Important Notice:** Some of the files are very large. Do NOT use this page with mobile data if not necessary!

The [website](https://julianegbert.github.io/bachelor-thesis-kepler.gl/) has a dropdown menu at the top left. It contains a list of all the files that can be loaded with this tool. After selecting a file a loading animation will appear. Depending on the filesize this might take a while. When the page is loaded it should be displayed below the bar at the top and fill the whole page.

In case of an error with loading, a message will be displayed. Check the console to see what causes this error.

### Using the visualization

On the left hand side of the loaded kepler.gl file you can find the controls for kepler.gl. At the top of it there are 4 symbols (one of which is highlighted) that indicate the tabs that can be switched between.

The left most tab is called "Layers". In it you can see the data files (entries that are at the top) and the Layers below. Each layer is based on only one dataset and can be toggled via the eye-icon. It can also be edited by clicking the arrow on the right.

The next tab is called "Filters". In there you can add, edit and remove filters for each dataset (NOT layers!). When adding a new filter, you first have to select the "Data Source". After that you can select the attribute that you want to filter. Based on the datatype you can then select a min and max value. The blue bars represent a histogram of the dataset for this value.

In the interactions tab you can choose the attributes that are shown on the map when hovering over elements of a layer. You can simply add and remove attributes by clicking on the field for each dataset.

The last tab is called "Base Map" and is used for the appearance of the map. It allows you to switch to a light map style or toggle different basic map layers like labels, roads, or borders.

### Export

Found something cool or interesting that you want to share? No problem! Kepler.gl provides an export option for the maps. In the control panel on the top right you can find a button "Share". This gives you the option to export the map as an image ("Export Image") or as a HTML file ("Export Map").

In case that you export your map as an image, you should think twice before checking the option "Add legend on map" because it doesn't look that nice in my opinion. If possible, you should create your own legend.

In the second case you should choose "Allow users to edit the map" as "Map Mode" if you want them to toggle layers and edit filters. The other option only allows the interaction with the map as it currently is.

When exporting as html you should be aware that you still require your own mapbox token to see the map. Creating one is free and can be done at the mapbox website. Alternatively you can just export the map as json and upload it at [kepler.gl/demo](kepler.gl/demo). There you already have a mapbox token provided by them.

## Troubleshooting

Please let me know if you encounter any error by creating an "Issue" in this repository. Especially problems with the mapbox token can be fixed easily by me, assuming I know about it.

If there is an error with the visualization it might be caused by your device that you visit this page on. Since kepler.gl uses webgl for the visualization, this might not be supported by your device. Some of the visualizations have a large filesize and therefore require a lot of memory of your computer. Please keep this in mind and check if this might cause an Issue, for example when opening several tabs.

## Using HTML files without this webpage

If you want to use the html files from the `files` folder without loading them in this webtool you need to inject your own mapbox token in the **PROVIDE_MAPBOX_TOKEN** field at the beginning of the downloaded file.
