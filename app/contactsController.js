(function() {
  angular
    .module("contactsApp")
    .controller("ContactsController", ["$http", ContactsController]);

  function ContactsController($http) {
    const vm = this;
    const emails = ["diogo-amaral@live.com", "di090.amaral@gmail.com"];
    vm.contact = { enderecos: [] };
    vm.contact.phones = [];
    vm.dados = [];

    vm.addPhone = function() {
      if (!phone.value) {
        return;
      }
      if (vm.contact.phones.indexOf(phone.value) == -1) {
        vm.contact.phones.push(phone.value);
        phone.value = "";
      } else {
        alert("O telefone já existe!");
      }
    };

    vm.removePhone = function(phone) {
      vm.contact.phones.splice(phone, 1);
    };

    vm.addAddress = function(index) {
      if (vm.address && cep.value) {
        vm.contact.enderecos == {}
          ? (vm.contact.enderecos = vm.address)
          : vm.contact.enderecos.splice(index + 1, 0, {
              logradouro: logradouro.value,
              bairro: bairro.value,
              estado: estado.value,
              cidade: cidade.value,
              numero: numero.value,
              cep: cep.value
            });
      }

      vm.refresh();
    };

    vm.removeAddress = function(address) {
      vm.contact.enderecos.splice(address, 1);
    };

    vm.refresh = function() {
      vm.address = "";
      cep.value = "";
      numero.value = "";
      vm.cep = false;
    };

    vm.findCep = function() {
      if (!cep.value) {
        vm.refresh();
      }
      $http
        .get(`https://api.postmon.com.br/v1/cep/${cep.value}`)
        .then(function(response) {
          vm.address = response.data;
          vm.cep = true;
        })
        .catch(function(response) {
          vm.refresh();
        });
    };

    vm.enter = function(e) {
      if (e.keyCode == 13) {
        vm.findCep();
      }
    };

    vm.store = function() {
      if (emails.indexOf(email.value) == -1) {
        vm.dados.splice(1, 0, {
          nome: nome.value,
          email: email.value,
          obs: obs.value,
          phones: vm.contact.phones,
          address: vm.contact.enderecos
        });
        console.log(vm.dados);
        alert("Sucesso!");
      } else {
        alert(`O e-mail ${email.value} já existe!`);
      }
    };
  }
})();
