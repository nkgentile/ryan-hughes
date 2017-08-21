'use strict';

Vue.component('marden', {
	data(){
		return {
			plans:[
				{
					source: "assets/images/Marden7thFloor.svg",
					caption: "Seventh Floor"
				},
				{
					source: "assets/images/Marden8thFloor.svg",
					caption: "Eighth Floor"
				},
				{
					source: "assets/images/Marden9thFloor.svg",
					caption: "Ninth Floor"
				}
			],
			images:[
				{
					source: "assets/images/7thFloor,%20Detail.jpg",
					caption: "Seventh Floor, 1/4&quot; = 1'"
				},
				{
					source: "assets/images/7th%20Floor,%20Detail2.jpg",
					caption: "Seventh Floor Detail, 1/4&quot; = 1'"
				},
				{
					source: "assets/images/7thFloor,%20Plan.jpg",
					caption: "Seventh Floor Plan View, 1/4&quot; = 1'"
				},
				{
					source: "assets/images/8th%20Floor,%20Detail.jpg",
					caption: "Eighth Floor Detail, 1/4&quot; = 1'"
				},
				{
					source: "assets/images/9th%20Floor,%20Detail.jpg",
					caption: "Ninth Floor, 1/4&quot; = 1'"
				},
				{
					source: "assets/images/9th%20Floor,%20Plan.jpg",
					caption: "Ninth Floor Plan View, 1/4&quot; = 1'"
				},
				{
					source: "assets/images/Building%20Together.jpg",
					caption: "Building Assembled Together, 1/4&quot; = 1'"
				},
				{
					source: "assets/images/Building%20Together%20Detail.jpg",
					caption: "Building Assembled Detail, 1/4&quot; = 1'"
				}
			],
			inspiration:[
				{
					source: "assets/images/Brice%20Marden,%20The%20Muses.jpg",
					caption: "&ldquo;The Muses,&rdquo; Brice Marden, 1991-93, image courtesy of <a target=\"_blank\" href=\"http://www.moma.org/explore/multimedia/audios/33/787\">MoMA</a>"
				},
				{
					source: "assets/images/Brice%20Marden,%20The%20Attended.jpg",
					caption: "&ldquo;The Attended,&rdquo; Brice Marden, 1996-9, image courtesy of <a target=\"_blank\" href=\"http://www.sothebys.com/en/auctions/ecatalogue/2013/nov-2013-contemporary-evening-n09037/lot.12.html\">Sotheby&rsquo;s</a>"
				},
				{
					source: "assets/images/Brice%20Marden,%20Line%20Muses.jpg",
					caption: "&ldquo;Line Muses,&rdquo; Brice Marden, 2001, image courtesy of <a href=\"http://www.artnet.com/artists/brice-marden/line-muses-JTAvPEPsKcfEXiySm0LELw2\">artnet</a>"
				},
				{
					source: "assets/images/Brice%20Marden,%20Eagles%20mere%20Muses.jpg",
					caption: "&ldquo;Eagles mere muses,&rdquo; Brice Marden, 2001, image courtesy of <a target=\"_blank\" href=\"http://www.christies.com/lotfinder/prints-multiples/brice-marden-eagles-mere-muses-5718679-details.aspx\">Christie&rsquo;s</a>"
				}
			],
			video:"<iframe width=\"600\" height=\"600\" src=\"https://www.youtube.com/embed/-cZ0eA91lx0\" frameborder=\"0\" allowfullscreen></iframe>"
		};
	},
	
    template: `
        <article>
            <header>
                <p>&ldquo;Marden&rdquo; served as the final project for Erin Besler&rsquo;s Winter 2016 architecture studio, &ldquo;The Fit Out.&rdquo; The program was to fit out part of the interior of another student&rsquo;s office building (in this case, a building designed by Lark Ruesch) for a particular tenant. I was responsible for the three half-sized floors showcased here, the tenant being a paper company requiring a structured, private-office plan for 200+ employees. The rest of the project was completed by a group of students: Colette Aro, Rayan Itani, Alicia Jones, Desiana Permata, Weslee Song, and myself.</p>
            </header>
            <project-gallery
                :assets="plans"
            >
            </project-gallery>
            <p>Wanting to escape the monotony and stillness of Taylorism and the traditional private, structured office plan in a wholly rectilinear building, this project inverses that model to create an idiosyncratic, dynamic environment. In an age when 80 ft&sup2; spaces are more likely to constitute &ldquo;tiny homes,&rdquo; than offices, I took the position that large private office spaces hamper productivity and unhealthily pressure employees to spend their entire days within the enclosed space. Furthermore, when offices are carbon copies of each other with square footage aligned with job title, it effectively renders the employee anonymous &ndash; known only by rank and function if at all. The private office for our plan is thus reimagined as a work cubby whose claustrophobic space forces the worker to perform only the most individualized of tasks inside. Inner-office hierarchies are broken down as employees of different levels are grouped together and common areas (such as break rooms and meeting rooms) are combined on a common floor. The significantly larger spaces allotted to executive and managers are meant to emphasize the absurdity of the square-footage to worth-within-company equation. Regardless of job title, every individual employee is given a unique workspace; no two are alike.</p>
            <project-gallery
                :assets="images"
            >
            </project-gallery>
            <p>Formally, this project explores the intersection of three different organizing systems: grid, frame, and ergonomics. The grid of the rectilinear building is broken up by geometries borrowed and traced from paintings by Brice Marden. I quote his work specifically for its ability to fill out a frame (the frame here being the perimeter walls of the floor plans) with freeform curves. Cramped workspaces defined by Marden's curves are balanced with comfortable, so-called ergonomic furnishings from Knoll along with an abundance of potted plants. By imposing multiple organizing systems in a space already too small for the demands of the program, this project argues that the work of the architect is less and less over-determined design and rather the mediation of the multiple found, or rather borrowed, systems and getting them all to <i>fit</i> within the fit-out.</p>
            <project-gallery
                :assets="inspiration"
            >
            </project-gallery>
            <iframe width="600" height="600" src="https://www.youtube.com/embed/-cZ0eA91lx0" frameborder="0" allowfullscreen></iframe>
            <footer>
				<p><i>Readings that informed this project include:</i></p>
				<p>Koolhaas, Rem. &quot;Junkspace.&quot; October 100 (2002): 175-90.</p>
				<p>Koolhaas, Rem. &quot;Regrets?&quot; <i>Grand Street 57</i> (1996): 137.</p>
				<p>Sullivan, Louis H. &ldquo;The Tall Office Building Artistically Considered.&rdquo; <i>Lippincott's Magazine</i>, March 1896.</p>
				<p>Tigerman, Bobbye. &quot;'I Am Not a Decorator': Florence Knoll, the Knoll Planning Unit and the Making of the Modern Office.&quot; <i>Journal of Design History</i> 20.1 (2007): 61-74. <i>JSTOR</i>.</p>
				<p>Wigley, Mark. &quot;C-Lab Columbia Laboratory for Architectural Broadcasting.&quot; <i>C-Lab Columbia Laboratory for Architectural Broadcasting</i>. N.p., n.d. Web. &lt;http://c-lab.columbia.edu/0124.html&gt;</p>
            </footer>
        </article>
    `
});
