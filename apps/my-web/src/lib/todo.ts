export type Todo = {
	no: number;
	title: string;
	detail: string;
	category: Category;
};

export type Category = typeof Categories;

export const Categories = ['仕事', 'プライベート', 'その他'];
