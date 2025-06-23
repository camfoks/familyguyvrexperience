 document.querySelector('[gltf-model]').addEventListener('model-loaded', function(e) {
console.log('Model loaded successfully');
});
            
document.querySelector('[gltf-model]').addEventListener('model-error', function(e) {
console.error('Error loading model:', e.detail);  
});

  // Simple jump component
            AFRAME.registerComponent('jump', {
                init: function() {
                    this.onKeyDown = this.onKeyDown.bind(this);
                    document.addEventListener('keydown', this.onKeyDown);
                },
                onKeyDown: function(event) {
                    if (event.code === 'Space') {
                        event.preventDefault();
                        const body = this.el.body;
                        if (body && Math.abs(body.velocity.y) < 0.1) {
                            body.velocity.y = 8;
                        }
                    }
                },
                remove: function() {
                    document.removeEventListener('keydown', this.onKeyDown);
                }
            });

            // Add character interaction
            AFRAME.registerComponent('character-info', {
                schema: {
                    name: {type: 'string'},
                    description: {type: 'string'}
                },
                init: function() {
                    this.el.addEventListener('click', () => {
                        alert(`${this.data.name}: ${this.data.description}`);
                    });
                    this.el.addEventListener('mouseenter', () => {
                        this.el.setAttribute('animation', {
                            property: 'rotation',
                            to: '0 360 0',
                            dur: 2000,
                            loop: true
                        });
                    });
                    this.el.addEventListener('mouseleave', () => {
                        this.el.removeAttribute('animation');
                    });
                }
            });