// JavaScript source code


let grid;
let cols;
let rows;
let resolution = 20;

//Create the 2D array
function create2DArray(cols, rows){
	let arr = new Array(cols);
	for(let i = 0; i < arr.length; i++)
	{
		arr[i] = new Array(rows);
	}
	return arr;
}

function setup() {
	createCanvas(1200,600);
	
	//Let the array be dynamic depending on screensize.
	cols = width/resolution;
	rows = height/resolution;
	//Create
	grid = create2DArray(cols, rows);
	
	//Populate rows with live or dead cells.
	for(let i = 0; i < cols; i++)
	{
		for(let j = 0; j < rows; j++)
		{
			grid[i][j] = floor(random(2));
		}
	}
	
	//Frame rate for visualisation
	frameRate(15);
}

let color = [200, 0, 0];

function draw() { 
	
	//Black background
	background(255); 
	
	//Draw the grid based on resolution
	for(let i = 0; i < cols; i++)
	{
		for(let j = 0; j < rows; j++)
		{
			let x = i * resolution;
			let y = j * resolution;
			if(grid[i][j] == 1)
			{
				fill(color);
				stroke(255);
				rect(x,y,resolution-1,resolution-1);
			}
		}
	}
	
	let nextGen = create2DArray(cols, rows);
	
	//Create next evolution based on grid
	for(let i = 0; i < cols; i++)
	{
		for(let j = 0; j < rows; j++)
		{
			
			//Dealing with the edges to make it work. will fix another day
			// if(i == 0 || i == cols-1 || j == 0 || j == rows-1)
			// {
				// nextGen[i][j] = grid[i][j];
			// }
			// else
			// {
			
			//How to count the live neighbour cells		
			let neighbours = neighbourCount(grid, i, j);
			
			//Rules to calculate the state of each evolution/iteration
			let state = grid[i][j];
			if (state == 0 && neighbours == 3)
				nextGen[i][j] = 1;
			else if (state == 1 && (neighbours < 2 || neighbours > 3))
				nextGen[i][j] = 0;
			else
				nextGen[i][j] = grid[i][j];
		//check each neighbour
			// sum += grid[i-1][j-1]	//Top Left neighbour
			// sum += grid[i][j-1]		//Top neighbour			
			// sum += grid[i+1][j-1]	//Top Right neighbour
			
			// sum += grid[i+1][j]		//Right neighbour
			// sum += grid[i-1][j]		//Left neighbour
				
			// sum += grid[i+1][j+1]	//Bottom Right neighbour
			// sum += grid[i][j+1]		//Bottom neighbour
			// sum += grid[i-1][j+1]	//Bottom Left neighbour
		
			//}
		}
	}
	
	grid = nextGen;
	
	//Gradually change colour
	
}

function neighbourCount(grid, x, y)
{
	let sum = 0;
	for(let i = -1; i<2; i++)
	{
		for(let j = -1; j<2; j++)
		{
			//include edges to wrap around each other.
			let edgerow = (y+j + rows) % rows;
			let edgecol = (x+i + cols) % cols;
			
				sum+=grid[edgecol][edgerow];	
		}
	}
	
	//Don't include the checked cell in the sum
	sum-=grid[x][y];
	
	return sum;
	//need to account for the edges of the grid.
	
}
