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
        console.log('Single ->', singlerecipe)
        const similarOnes = await getRecipesByIngredients(
            singlerecipe.ingredients
        )
        console.log('More ->', similarOnes.splice(1, 4))
        this.setState({
            recipe: singlerecipe,
            loading: false,
            data: similarOnes.splice(1, 4)
        })
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
                                    return (
                                        <RecipeItem
                                            key={index}
                                            recipe={recipe}
                                        />
                                    )
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
