# Station Finder

This is a simple application build with Azure Functions for Serverless API and React for the Client Side.

# Features!
  - Provides the most suitable Station near the device location (x, y) by calculating the Power with respect to the Station. 
  - A link station’s power can be calculated: power = (reach - device's distance from linkstation)^2. if distance > reach, power = 0
  - Front-end Client App uses Webpack for Production builds. The CSS and Javascript files are minified for the Production builds at deployment

# Requirements
- Azure Functions Core tools - `npm i -g azure-functions-core-tools`
- NPM v8.x.x
- VS Code/Visual Studio

# How To Run
- Clone the repo `git clone https://github.com/rafaykh90/StationFinder.git`
- Run `func host start` (Make sure you have already installed the Azure Functions Core tools - change port using `-p <PortNumber>` if necessary) 