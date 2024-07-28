export default function autoExecutions () {
    return {
      name: 'autoExecutions', // this name will show up in logs and errors
      banner() {
        return `
        require('./autoExecutions.js');
        `;
      }
  }
}