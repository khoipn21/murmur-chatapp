import LandingLayout from "@layouts/LandingLayout";
import Hero from "@sections/Hero";
function Landing() {
	return (
		<LandingLayout>
			<Hero
				title="Murmur"
				subtitle="Whether you’re part of a school club,
          gaming group, worldwide art community,
          or just a handful of friends that want to spend time together,
          Murmur makes it easy to talk every day and hang out more often."
				image="/logo/Darkmode.png"
				ctaText="Get Started"
				ctaLink="/register"
			/>
		</LandingLayout>
	);
}
export default Landing;
