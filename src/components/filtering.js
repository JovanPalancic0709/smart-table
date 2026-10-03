/*import {createComparison, defaultRules} from "../lib/compare.js";*/

// @todo: #4.3 — настроить компаратор
/*const compare = createComparison(defaultRules);*/

export function initFiltering(elements) {
    const updateIndexes = (elements, indexes) => {
        // @todo: #4.1 — заполнить выпадающие списки опциями
        Object.keys(indexes)
            .forEach((elementName) => {
                elements[elementName].append(
                    ...Object.values(indexes[elementName])
                        .map(name => {
                            const el = document.createElement('option');
                            el.textContent = name;
                            el.value = name;
                            return el;

                        })
                );
            });
    }

    const applyFiltering = (query, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'clear') {
            const clearInputParent = action.parentElement;
            const clearInput = clearInputParent.querySelector('input');

            if (clearInput) {
                clearInput.value = '';
            }
            const fieldName = action.dataset.field;
            if (fieldName && state[fieldName]) {
                state[fieldName] = '';
            }     
        }
        const filter = {};
        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                if (['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) {
                   filter[`filter[${elements[key].name}]`] = elements[key].value; 
                }
            }
        }

        )

        return Object.keys(filter).length ? Object.assign({}, query, filter) : query
    }

    return {
        updateIndexes,
        applyFiltering
    }


    /*return (data, state, action) => {
        

        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }*/
}