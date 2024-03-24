
process.env.NODE_ENV="test"

const app = require("../app")
const request = require("supertest")

    test("Should return location suggestions", async()=>{
        const res = await request(app).get("/map/suggestions/?search=miami")
        expect(res.statusCode).toBe(200)
        expect.objectContaining({
			"name": "Miami Beach",
			"mapbox_id": "dXJuOm1ieHBsYzpESkVvN0E",
			"feature_type": "place",
			"place_formatted": "Florida, United States",
			"context": {
				"country": {
					"id": "dXJuOm1ieHBsYzpJdXc",
					"name": "United States",
					"country_code": "US",
					"country_code_alpha_3": "USA"
				},
				"region": {
					"id": "dXJuOm1ieHBsYzpCZVRz",
					"name": "Florida",
					"region_code": "FL",
					"region_code_full": "US-FL"
				},
				"district": {
					"id": "dXJuOm1ieHBsYzo3d2Jz",
					"name": "Miami-Dade County"
				}
			}})
    })

    test("Should return coordinates by location id", async()=>{
        const res = await request(app).get("/map/dXJuOm1ieHBsYzpESkVvN0E")
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({"coordinates": [-80.132812, 25.813489]})
    })

    test("Should return forecast by coordinates", async()=>{
        const res = await request(app).get("/weather/forecast/?lat=25.813489&lng=-80.132812")
        expect(res.statusCode).toBe(200)
        expect.objectContaining({
			"startTime": "2024-03-23T10:00:00Z",
			"values": {
				"precipitationProbability": 50,
				"precipitationType": 1,
				"temperature": 77.62,
				"weatherCode": 1001,
				"windSpeed": 15.95
			}})
    })

    test('Should return weather description by code', async()=>{
        const res = await request(app).get("/weather/codes/1100")
        expect(res.statusCode).toBe(200)
        expect(res.text).toEqual("Mostly Clear")
    })