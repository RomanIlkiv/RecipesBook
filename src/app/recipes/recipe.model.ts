export class Recipe {
	public name: string;
	public description: string;
	public imagePath: string;
	public ingredients;
	public id: number;

	constructor(name: string, desc: string, imagePath: string, ingredients, id: number) {
		this.name = name;
		this.description = desc;
		this.imagePath = imagePath;
		this.ingredients = ingredients;
		this.id = id;
	} 
}