import React from "react";
import LandingLayout from "../components/layouts/LandingLayout";
import Hero from "../components/sections/Hero";

export const Landing: React.FC = () => (
	<LandingLayout>
		<Hero
			title="Murmur"
			subtitle="Whether you’re part of a school club,
          gaming group, worldwide art community,
          or just a handful of friends that want to spend time together,
          Murmur makes it easy to talk every day and hang out more often."
			image="public\logo\Darkmode.png"
			ctaText="Get Started"
			ctaLink="/register"
		/>
	</LandingLayout>
);
