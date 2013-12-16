//The delcartion of a type writer;
var TypeWriter = {
  counter: 0,
  speed: null,
  text: '',
  textSet: '',
  trigger: true,
  timer: null,
  //Sets a standard js setInterval that can be called internally and cleared
  setTimer: function(func, speed) {
    var self = this;
    this.timer = setInterval(func, speed || self.speed);
  },
  //Starts a to fire off at the end.
  startCursor: function() {
    var self = this;
    this.setTimer(function() {
      if (self.trigger) {
        self.trigger = false;
        self.textSet += ' []';
      } else {
        self.trigger = true;
        self.textSet = self.text;
      }
      self.print(self.textSet);
    }, 1000);
  },
  //Types out the words you inited with
  type: function() {
    if (this.counter !== this.text.length) {
      this.textSet += this.text[this.counter];
      this.counter++;
      this.print(this.textSet);
    } else {
      clearInterval(this.timer);
      this.startCursor();
    }
  },
  //Prints to the screen, you change this function to use a jQuery selector and .html()
  //EX: $('#writer').html(text);
  print: function(text) {
    document.querySelector('#writer').innerHTML = text.replace(/\|/gi, '<br />');
  },
  //Inits the type writer
  init: function(text, speed) {
    if (text) {
      var self = this;
      this.speed = speed || 100;
      this.text = text;
      this.setTimer(function() {
        self.type();
      });  
    } else {
      console.warn('You need to use some text bro');
    }
  }
}

TypeWriter.init("I am a type writer and I can use pipes for breaks, see|you did a line break.", 100);

