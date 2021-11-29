import { readFileSync, writeFileSync } from 'fs'
const companies = JSON.parse(readFileSync('backend/src/companies.json').toString())

const services = [
    "plumbing", "electrical", "demolition", "excavation", "sewage"
]

const cities =
    [
        "Berlin",
        "Hamburg",
        "München",
        "Köln",
        "Frankfurt",
        "Essen",
        "Dortmund",
        "Stuttgart",
        "Düsseldorf",
        "Bremen",
        "Hannover",
        "Duisburg",
        "Nürnberg",
        "Leipzig",
        "Dresden",
        "Bochum",
        "Wuppertal",
        "Bielefeld",
        "Bonn",
    ]

const newCompanies = companies.map((x) => ({
    ...x,
    city: cities[Math.round(Math.random() * (cities.length - 1))],
    services: [...new Set([services[Math.round(Math.random() * (services.length - 1))], ...services.map(s => Math.random() > 0.5 ? s : null).filter(x => x)])].sort(),
}))

console.log(newCompanies)

writeFileSync('backend/src/companies.json', JSON.stringify(newCompanies))