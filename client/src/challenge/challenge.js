const challenge = [
    {
        id: 1,
        chall: 'Write a function that returns the sum of two numbers!',
        test: "assert.equal(add(1, 3) === 4, 'addition of 1 & 3 is 4')"
    },

    {
        id: 2,
        chall: "Define a variable 'foo', and set its value to a string!",
        test: "expect(foo).to.be.a('string'); expect(foo).to.equal('bar'); expect(foo).to.have.lengthOf(3);"
    },

    {
        id: 3,
        chall: "Find the area of a triangle where lengths of the three of its sides are 5, 6, 7",
        test: "expect(area).to.equal(14.696938456699069);"
    },

    {
        id: 4,
        chall: "Define an object 'beverages' with a property 'chai'. Set value of 'chai' to a string with a length of 6!",
        test: "expect(beverages).to.be.an('object'); expect(beverages).to.have.property('tea', 'chai').with.lengthOf(4); expect(beverages).to.have.property('lunch')"
    },
]

export default challenge;