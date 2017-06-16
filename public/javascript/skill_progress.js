var skills = [
  { name: 'ruby', text: 'Ruby / Rails', score: 0.75},
  { name: 'javascript', text: 'Javascript', score: 0.55},
  { name: 'python', text: 'Python', score: 0.5},
  { name: 'front-end', text: 'HTML + CSS', score: 0.9},
  { name: 'shell', text: 'Shell Scripting', score: 0.75},
  { name: 'sql', text: 'SQL', score: 0.4},
  { name: 'testing', text: 'Testing / Automation', score: 1},
];

function animateSkills(list) {
  list.forEach(function(skill) {
    var element = "skill-" + skill.name;
    var semiCircle = new ProgressBar.SemiCircle(("#" + element), {
      strokeWidth: 4,
      color: '#048c6e',
      trailColor: '#ddd',
      trailWidth: 2,
      easing: 'easeInOut',
      duration: 2800,
      svgStyle: null,
      text: {
        value: skill.text
      },
    });

    Object.assign(semiCircle.text.style, {
      position: 'relative',
      top: 0,
      left: 0,
      bottom: 0,
      transform: 'inherit',
      textAlign: 'center',
      height: '2em',
    });

    var waypoint = new Waypoint({
      element: document.getElementById(element),
      handler: function() {
        console.log("animating semi circle!");
        semiCircle.animate(skill.score);
        this.destroy(); //prevent repeat animations
      },
      offset: '75%'
    });
  });
}

animateSkills(skills);


