/* Queries

document.querySelectorAll('#ct .infinite_scroll .item_inner .price_line .type')[0].innerText
'매매'
document.querySelectorAll('#ct .infinite_scroll .item_inner .price_line .price')[0].innerText
'6억'
document.querySelectorAll('#ct .infinite_scroll .item_inner .info_area .line .type')[0].innerText
'아파트'
document.querySelectorAll('#ct .infinite_scroll .item_inner .info_area .line .spec')[0].innerText
'53/41m², 2/37층, 남서향'

const unitsNodes = document.querySelectorAll('#ct .infinite_scroll .item_inner')

const unitsNodesArray = Array.from(unitsNodes)

unitsNodesArray.map((unitNode) => {
    let contractType = unitNode.querySelector('.price_line .type').innerText
    let price = unitNode.querySelector('.price_line .price').innerText
    let unitType = unitNode.querySelector('.info_area .line .type').innerText
    let unitSpec = unitNode.querySelector('.info_area .line .spec').innerText
    return { contractType, price, unitType, unitSpec }
})

*/

export const queryBuildingName = `let result = document.querySelector('#complexTitle')
   result ? result.innerText : undefined
  `

export const queryUnits = `const unitsNodes = document.querySelectorAll('#ct .infinite_scroll .item_inner')

const unitsNodesArray = Array.from(unitsNodes)

unitsNodesArray.map((unitNode) => {
    let typeQuery = unitNode.querySelector('.price_line .type')
    if (!typeQuery) {
      return undefined
    }

    let contractType = unitNode.querySelector('.price_line .type').innerText
    let price = unitNode.querySelector('.price_line .price').innerText
    let unitType = unitNode.querySelector('.info_area .line .type').innerText
    let unitSpec = unitNode.querySelector('.info_area .line .spec').innerText
    return { contractType, price, unitType, unitSpec }
}).filter((result) => result !== undefined)
`
