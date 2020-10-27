## Introduction
This is a propeller efficiency calculator SPA powered by Vue and Flask. 

## Preparing the data
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
