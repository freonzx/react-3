import React, { Component } from 'react'
import RecipeItem from './RecipeItem'
import { getRecipesByName, getRecipesByIngredients } from '../services/recipes'
import { slugify } from '../helpers'

class RecipePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recipe: {
                thumbnail: '',
                title: '',
                ingredients: ''
            },
            data: [],
            loading: true
        }
    }

    componentDidMount() {
        const { searchString } = this.props
        this.fetchRecipe(searchString)
    }

    fetchRecipe = async searchString => {
        const recipe = await getRecipesByName(searchString)
        const singlerecipe = recipe.shift()
        console.log(singlerecipe)
        this.setState({ recipe: singlerecipe, data: recipe, loading: false })
        return
    }

    render() {
        const { thumbnail, title, ingredients } = this.state.recipe
        const { data } = this.state

        return (
            <React.Fragment>
                {!this.state.loading ? (
                    <div>
                        <img src={thumbnail} alt={title} />
                        <div className='card-body'>
                            <h5 className='card-title'>{title}</h5>
                            <p className='card-text'>
                                <strong>Ingredients: </strong>
                                {ingredients}
                            </p>
                            <h5 className='card-title'>Similar recipes</h5>
                            <div className='row'>
                                {data.map((recipe, index) => {
                                    if (index >= 4) {
                                        return
                                    }
                                    return <RecipeItem recipe={recipe} />
                                })}
                            </div>
                        </div>
                    </div>
                ) : null}
            </React.Fragment>
        )
    }
}

export default RecipePage
