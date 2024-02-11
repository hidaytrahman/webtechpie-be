export interface IMeta {
	name: string;
	content: string;
}

export interface IBodyControls {
	title: string;
	link: string;
	type: string;
	props: [] | Record<string, unknown>;
}

export interface IBody {
	title: string;
	type: "list" | "section";
	content: string;
	controls: IBodyControls[];
}

export interface IPage {
	_id?: string;
	title: string;
	name: string;
	descriptions: string;
	meta: IMeta[];
	body: IBody[];
}
