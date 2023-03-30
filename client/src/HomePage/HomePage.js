import "./HomePage.css"

function HomePage() {
    return (
        <div>
	<main>
		<section className="banner">
			<h2>Welcome to our website!</h2>
			<p>Learn more about topic models and how they can help you with your research projects.</p>
			<a href="/search" className="btn">Get Started</a>
        </section>
	</main>
	
	<footer>
		<p>&copy; 2023 Topic Models Website</p>
	</footer>
</div>
    )
}

export default HomePage;