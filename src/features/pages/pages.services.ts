import { Injectable } from '@nestjs/common';
import { portfolioList, solutionHighlights } from './data';

@Injectable()
export class PagesServices {

	getLanding() {
		return 'This is landing';
	}

	getSolutions() {
		return {
			title: "Our Solutions",
			pageId: "solutions",
			descriptions: "Coding is a form of creative expression. You can turn your ideas into reality by building software and applications that solve real-world problems.",
			highlights: solutionHighlights
		}
	}

	getPortfolio() {
		return {
			title: "Portfolio",
			pageId: "portfolio",
			descriptions: "Our developer community",

			list: portfolioList
		}
	}

	getNavigations() {
		return {
			primaryNavs: [
				{ id: 1, title: "Home", name: "home", link: "/" },
				{ id: 2, title: "About Us", name: "about", link: "/about" },
				{ id: 3, title: "Solutions", name: "solutions", link: "/products" }
			],
			footerNavs: [
				{ id: 1, title: "Home", name: "home", link: "/" },
				{ id: 2, title: "About Us", name: "about", link: "/about" },
				{ id: 3, title: "Solutions", name: "solutions", link: "/products" }
			],


			socialMediaList: [
				{ icon: "fa-facebook-square", link: "#" },
				{ icon: "fa-twitter", link: "#" },
				{ icon: "fa-google-plus-g", link: "#" }
			],

		}
	}
}