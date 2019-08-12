import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { slugify } from '../helpers'

const highlight = (text, highlight) => {
    if (text !== null && text !== '' && typeof text !== 'undefined') {
        let regex = new RegExp(`(${highlight})`, 'gi')
        let parts = text.split(regex)
        return (
            <span>
                {parts.map((part, index) => {
                    if (part.toLowerCase() === highlight) {
                        return <mark key={index}>{part}</mark>
                    }
                    return part
                })}
            </span>
        )
    }
}

const RecipeItem = ({ recipe = {}, mark }) =>
    recipe.title ? (
        <div className='RecipeItem col-sm-3 mt-3 mb-3'>
            <div className='card'>
                <Link to={`/recipe/${recipe.title.toLowerCase()}`}>
                    <img
                        className='card-img-top img-fluid'
                        src={
                            recipe.thumbnail ||
                            'https://via.placeholder.com/350x260'
                        }
                        alt={recipe.title}
                    />
                    <div className='card-body'>
                        <h5 className='card-title'>
                            {highlight(recipe.title, mark)}
                        </h5>
                        <p className='card-text'>
                            <strong>Ingredients: </strong>
                            {highlight(recipe.ingredients, mark)}
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    ) : null

RecipeItem.propTypes = {
    title: PropTypes.string,
    ingredients: PropTypes.string,
    thumbnail: PropTypes.string,
    searchString: PropTypes.string
}

export default RecipeItem
