import React, { Component } from 'react'
import { Redirect, Route, Switch, matchPath } from 'react-router-dom'
import Navbar from './Navbar'
import Home from './Home'
import RecipePage from './RecipePage'
import { getRecipesByName } from '../services/recipes'
import { withRouter } from 'react-router'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            recipeSelected: {
                thumbnail: '',
                title: '',
                ingredients: ''
            }
        }
    }

    handleRecipeChange = recipe => {
        this.setState({ recipeSelected: recipe })
        console.log(recipe)
    }

    render() {
        const HomeRoute = ({ match }) => (
            <Home
                searchString={match.params.searchString}
                selected={this.handleRecipeChange}
            />
        )

        const RecipePageRoute = ({ match }) => (
            <RecipePage
                recipe={this.state.recipeSelected}
                selected={this.handleRecipeChange}
            />
        )

        return (
            <div className='App'>
                <Route
                    exact
                    path='/search/:searchString?'
                    children={({ match }) => (
                        <Navbar
                            searchString={
                                match ? match.params.searchString || '' : ''
                            }
                        />
                    )}
                />

                <div className='container mt-10'>
                    <Switch>
                        <Route
                            exact
                            path='/recipe/'
                            component={RecipePageRoute}
                        />
                        <Route
                            path='/search/:searchString?'
                            component={HomeRoute}
                        />
                        <Redirect to='/search' />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default withRouter(App)
