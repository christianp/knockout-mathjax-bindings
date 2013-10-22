/* Copyright (c) 2013 Christian Perfect
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */



ko.bindingHandlers.latex = {
	update: function(element,valueAccessor) {
		ko.bindingHandlers.html.update.apply(this,arguments);
		MathJax.Hub.Queue(['Typeset',MathJax.Hub,element]);
	}
}

ko.bindingHandlers.maths = {
	update: function(element,valueAccessor,allBindingsAccessor) {
		var val = ko.utils.unwrapObservable(valueAccessor());
		var display = allBindingsAccessor()['displayMaths'];
		var scriptTag = document.createElement('script');
		scriptTag.setAttribute('type','math/tex' + (display ? '; mode=display': ''));
		scriptTag.text = val;
		element.innerHTML = '';
		element.appendChild(scriptTag);
		MathJax.Hub.Queue(['Typeset',MathJax.Hub,element]);
	}
}

function viewModel() {
	this.tex = ko.observable('\\frac{1}{2}');
	this.content = ko.observable('<em>Euler\'s formula</em> is \\[ e^{\\pi \\mathrm{i}} + 1 = 0 \\]');
};
var vm;
window.onload = function() {
	vm = new viewModel();
	ko.applyBindings(vm);
}
