import { useAuth } from './useAuth';

export const About = () => {
	useAuth();
    return (
        <div>
            <h1>This game was proudly developed by Cullen, David, Josue, and Steven.</h1>
            <p>More features will be added once we are rich! Please donate (XRP preferred).</p>
        </div>
    ) 
    
    // Thinking can add stripe payment into the about page.
    // also add links to github pages for each member
};

export default About;
