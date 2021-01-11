const fs = require('fs')
fs.readFile('./input', 'utf8', (err, input) => {
	if (err) throw err
	
	input = input.split('\n').map((line) => {return line.split(' ').join('')});
	
	let result = [];
	for(const line of input) {
		let temp = line;
		while(countParenthesis(temp) !== 0) {
            temp = removeParenthesis(temp);
		}
		result.push(resolveWithoutParenthesis(temp));
	}
	
	console.log(result.reduce((acc, curr) => acc + curr))
	
	function removeParenthesis(string) {
		let result = string;
		for(let i = 0; i < result.length; i++) {
			if(result[i] === ')') {
				let parenthesisContent = '';
				let j = i - 1;
				while(result[j] !== '(') {
					parenthesisContent  += result[j];
					j--;
				}
				parenthesisContent = parenthesisContent.split('').reverse().join('');
				let num = resolveWithoutParenthesis(parenthesisContent).toString();
				result = result.replace('(' + parenthesisContent + ')', num);
				i = 0;
			}
		}
		return result;
	};
	
	function countParenthesis(string) {
		let result = 0;
		
		for(const char of string) {
			if(char === ')') result++;
		}
		return result;
	};
	
	function resolveWithoutParenthesis(string) {
        let digits = string.match(/\d+/g).map(Number);
        let signs = string.match(/\+|\*/g);
        
        for(let i = 0; i < signs.length; i++) {
            if(signs[i] === '+') {
                let temp = digits[i] + digits[i + 1];
                digits.splice(i, 2, temp);
                signs.splice(i, 1);
                i = -1;
            }
        }

        let result = digits.reduce((acc, curr) => acc * curr);
        return result;
    };
})