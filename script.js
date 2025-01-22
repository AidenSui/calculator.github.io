class Calculator {
    constructor() {
        this.displayValue = '0';
        this.previousValue = null;
        this.operation = null;
        this.newNumber = true;
        this.MAX_DIGITS = 11;  // 最大显示位数
        this.MAX_VALUE = 99999999999;  // 最大值
        this.MIN_VALUE = -99999999999;  // 最小值
        
        this.display = document.querySelector('.display-value');
        this.bindEvents();
        this.sylvanasPopup = document.getElementById('sylvanasPopup');
        this.setupLionPopup();
    }

    bindEvents() {
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', () => {
                const action = button.dataset.action;
                if (action) {
                    this.handleAction(action);
                } else {
                    this.handleNumber(button.textContent);
                }
                this.updateDisplay();
            });
        });
    }

    handleNumber(number) {
        if (this.newNumber) {
            this.displayValue = number;
            this.newNumber = false;
        } else {
            if (this.displayValue.replace('.', '').length >= this.MAX_DIGITS) {
                return;
            }
            this.displayValue = this.displayValue === '0' ? 
                number : this.displayValue + number;
        }
    }

    handleAction(action) {
        if (['add', 'subtract', 'multiply', 'divide'].includes(action)) {
            if (Math.random() < 0.10) {
                this.showLion();
                new Audio('https://wow.zamimg.com/sound-ids/live/zhCN/196/27972').play().catch(() => {});
            }
        }

        switch (action) {
            case 'clear':
                this.clear();
                break;
            case 'plus-minus':
                this.plusMinus();
                break;
            case 'percent':
                this.percent();
                break;
            case 'decimal':
                this.decimal();
                break;
            case 'equals':
                this.calculate();
                this.operation = null;
                break;
            default:
                if (this.operation && !this.newNumber) {
                    this.calculate();
                }
                this.operation = action;
                this.previousValue = this.displayValue;
                this.newNumber = true;
                break;
        }
    }

    calculate() {
        if (!this.previousValue || !this.operation) return;

        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.displayValue);
        let result;

        if (this.operation === 'divide' && current === 0) {
            this.displayValue = 'Error';
            this.newNumber = true;
            return;
        }

        switch (this.operation) {
            case 'add':
                result = prev + current;
                break;
            case 'subtract':
                result = prev - current;
                break;
            case 'multiply':
                result = prev * current;
                break;
            case 'divide':
                result = prev / current;
                break;
        }

        this.displayValue = this.formatResult(result);
        if (this.displayValue === 'Error') {
            this.previousValue = null;
            this.operation = null;
        }
        this.newNumber = true;
    }

    clear() {
        this.displayValue = '0';
        this.previousValue = null;
        this.operation = null;
        this.newNumber = true;
    }

    plusMinus() {
        this.displayValue = (parseFloat(this.displayValue) * -1).toString();
    }

    percent() {
        this.displayValue = (parseFloat(this.displayValue) / 100).toString();
    }

    decimal() {
        if (!this.displayValue.includes('.')) {
            this.displayValue += '.';
        }
    }

    formatResult(number) {
        if (number > this.MAX_VALUE) {
            return 'Error';
        }
        if (number < this.MIN_VALUE) {
            return 'Error';
        }
        
        if (number.toString().includes('.')) {
            const [integer, decimal] = number.toString().split('.');
            if (integer.length > this.MAX_DIGITS) {
                return 'Error';
            }
            const maxDecimalPlaces = Math.max(0, this.MAX_DIGITS - integer.length - 1);
            return Number(number).toFixed(Math.min(decimal.length, maxDecimalPlaces));
        }
        
        if (number.toString().length > this.MAX_DIGITS) {
            return 'Error';
        }
        
        return number.toString();
    }

    updateDisplay() {
        this.display.textContent = this.displayValue;
    }

    setupLionPopup() {
        this.sylvanasPopup.addEventListener('click', () => {
            this.sylvanasPopup.classList.remove('show');
        });
    }

    showLion() {
        this.sylvanasPopup.classList.add('show');
        setTimeout(() => {
            this.sylvanasPopup.classList.remove('show');
        }, 3000);
    }
}

// 初始化计算器
new Calculator(); 