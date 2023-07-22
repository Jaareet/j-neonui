$(document).ready(() => {
    const config = {
        name: 'j-neonui',
        toggle: false,
        radar: false,
        editing: false,
        otherData: {},
        microphone: {
            talking: false,
            proximityLevel: 0,
        },
        status: {
            health: 0,
            armor: 0,
            hunger: 0,
            thirst: 0,
            stamina: 0,
            oxygen: 0,
            stress: 0,
            drunk: 0,
            voice: 0,
        },
        icons: {
            health: 'heart-pulse',
            armor: 'shield-check',
            hunger: 'burger-lettuce',
            thirst: 'cup-straw-swoosh',
            stamina: 'running',
            oxygen: 'lungs',
            stress: 'brain',
            drunk: 'martini-glass-citrus',
            voice: 'microphone',
        }
    }
    if (!window.invokeNative) return;
    const app = new Vue({
        el: '#app',
        data: config,
        methods: {
            update(data) {
                for (const [key, value] of Object.entries(data.status)) {
                    this.status[key] = value != undefined && typeof value != 'boolean' ? Math.round(value) : value;
                }
                this.toggle = data.toggle != undefined ? data.toggle : this.toggle;
                this.radar = data.radar != undefined ? data.radar.state : this.radar;
                this.microphone = data.microphone != undefined ? data.microphone : this.microphone;
                this.status.voice = (this.microphone.proximityLevel * 100) / 3;
            },
            setup() {
                document.title = this.name;
                window.addEventListener('message', ({ data }) => {
                    this[data.type] && this[data.type](data);
                });
                document.onkeydown = ({ key }) => {
                    (this.editing && key === 'Escape') && this.closeEdit();
                }
                this.log('Loaded successfully')
            },
            log(text) {
                window.invokeNative ? console.log(`[LOG] [${this.name}] [${new Date().toISOString().split('T')[0]} ${new Date().toISOString().split('T')[1].split('.')[0]}] ${text}`) : console.log(`%c[LOG] %c[${this.name}] %c[${new Date().toISOString().split('T')[0]} ${new Date().toISOString().split('T')[1].split('.')[0]}] %c${text}`, 'color: #fff; background: #000; padding: 2px 4px; border-radius: 2px;', 'color: #fff; background: #000; padding: 2px 4px; border-radius: 2px;', 'color: #fff; background: #000; padding: 2px 4px; border-radius: 2px;', 'color: #fff; background: #000; padding: 2px 4px; border-radius: 2px;');
            }
        },
        mounted() {
            this.setup();
        },
    })
})