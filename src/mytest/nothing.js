import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import App from '../components/App'
import RecipePage from '../components/RecipePage'

jest.mock('../services/recipes', () => ({
    getRecipesByName: jest.fn(async () => []),
    getRecipesByIngredients: jest.fn(async () => [])
}))

import { getRecipesByName, getRecipesByIngredients } from '../services/recipes'

describe('App', () => {
    beforeEach(() => {
        getRecipesByName.mockReset()
        getRecipesByIngredients.mockReset()
    })

    test('Render recipes', done => {
        const recipe = {
            title: 'test',
            ingredients: 'ingredients'
        }

        getRecipesByName.mockReturnValue(Promise.resolve([recipe]))

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search/asd']}>
                <App />
            </MemoryRouter>
        )

        setImmediate(() => {
            try {
                wrapper.update()
                expect(wrapper.find('RecipeItem').length).toEqual(1)
                expect(getRecipesByName).toHaveBeenCalled()
                done()
            } catch (e) {
                fail(e)
                done()
            }
        })
    })

    test('Render recipes pagination', done => {
        const recipe = {
            title: 'test',
            ingredients: 'ingredients'
        }

        getRecipesByName.mockReturnValue(Promise.resolve([recipe]))

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search/asd']}>
                <App />
            </MemoryRouter>
        )

        setImmediate(() => {
            try {
                wrapper.update()
                expect(wrapper.find('RecipeItem').length).toEqual(1)
                wrapper.find('App .pagination button#next').simulate('click')
                expect(getRecipesByName).toHaveBeenCalledTimes(2)
                expect(getRecipesByName).toHaveBeenLastCalledWith('asd', 2)
                done()
            } catch (e) {
                fail(e)
                done()
            }
        })
    })

    test('Render recipe page', done => {
        const recipe = {
            title: 'test',
            ingredients: 'ingredients'
        }

        getRecipesByIngredients.mockReturnValue(
            Promise.resolve([
                {
                    title: 'rec 1',
                    ingredients: 'ingredients rec 1'
                },
                {
                    title: 'rec 2',
                    ingredients: 'ingredients rec 2'
                }
            ])
        )

        const wrapper = mount(
            <MemoryRouter initialEntries={['/recipe']}>
                <RecipePage recipe={recipe} />
            </MemoryRouter>
        )

        setImmediate(() => {
            try {
                wrapper.update()
                expect(wrapper.find('RecipeItem').length).toEqual(2)
                expect(getRecipesByIngredients).toHaveBeenCalledWith(
                    recipe.ingredients
                )
                done()
            } catch (e) {
                fail(e)
                done()
            }
        })
    })
})
