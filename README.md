## Introduction
This is a propeller efficiency calculator SPA powered by Vue and Flask. 

## How does it work?
The user interface functions have been divided into three interdependent tabs. 
The input data has been grouped into the **Engine** and **Propeller** tabs, and the calculation results can be viewed in the **Results** tab.

### Designing the engine performance
The user can model the engine power curve exactly as he wants.
There are countless configurations, ranging from **turbine to twincharged piston engines**.
The user has freedom to choose the forced induction method, but natural aspiration is also possible.
All key engine data has been grouped in this module.

<img src="https://github.com/adamsmietanka/propeller-mesher/blob/master/docs/images/app_engine.png" align=middle/>

The Engine tab consists of three elements. 
The first is the master data form that allows you to change engine parameters that directly affect the performance curve displayed on the right.
This graph is fully interactive - any change will update the power function. 
This allows the user to quickly prototype and customize your aircraft design for different types of propulsion. 

The last element of the tab is an additional form visible under the chart. 
These are the two fields that do not affect the graph directly but are necessary for the efficiency calculation.

### Optimizing the propeller
The next tab groups data about the aircraft propeller. 
The user can use an algorithm to calculate the diameter optimized for given parameters or enter the diameter of his choice, provided that the manual mode is selected.
The results of the optimization are presented in two ways - in the form of a table and a graph.
The **Power field is automatically updated** based on the Engine tab data and the altitude specified by the user.

<img src="https://github.com/adamsmietanka/propeller-mesher/blob/master/docs/images/app_prop.png" align=middle/>

The user can choose the material from which the propeller blades are made. 
This choice is crucial as it limits the maximum possible speed that can be achieved by the blade tips. 
In the range of transonic velocities, the drag coefficient increases significantly as one approaches the speed of sound.

### Visualizing the results
The first text field specifies the altitude for which the aircraft performance is calculated. 
As in the previous tab, it affects the engine power displayed below.
The results are clearly presented on the graphs and in the form of a table.

<img src="https://github.com/adamsmietanka/propeller-mesher/blob/master/docs/images/app.png" align=middle/>

Thanks to the modular architecture and easy access to data, the application can easily be extended with additional tabs. 
A possible development path is **creating a program supporting the whole aircraft design process**. 
This application is its first completed module.

### Preparing the data
The mesh preparation process is explained [here](https://github.com/adamsmietanka/propeller-mesher#propeller-chart-meshing-toolkit).

## Getting started
1. Clone the project to your machine
    ```
    $ git clone https://github.com/adamsmietanka/prop-calculator-vue.git
    ```
2. Setup virtual environment, install dependencies, and activate it
    ```
    $ pipenv install --dev
    $ pipenv shell
    ```
3. Install JS dependencies
    ```
    $ yarn install
    ```

## Development Server

Run Flask Api development server:

```
$ python run.py
```

From another tab in the same directory, start the webpack dev server:

```
$ yarn serve
```

The Vuejs application will be served from `localhost:8080` and the Flask Api
and static files will be served from `localhost:5000`.

The dual dev-server setup allows you to take advantage of
webpack's development server with hot module replacement.

If you would rather run a single dev server, you can run Flask's
development server only on `:5000`, but you have to build build the Vue app first
and the page will not reload on changes.

```
$ yarn build
$ python run.py
```

## Built With
* [Vue.js](https://vuejs.org/) - This is a modern and easy to use JavaScript web framework
* [Flask](http://flask.pocoo.org/) - This is a microframework for Python
* [SciPy](http://scipy.org/) - This is a Python library used for scientific and technical computing
* [Plotly](http://plotly.com/) - This Python/JS graphing library makes interactive, publication-quality graphs
