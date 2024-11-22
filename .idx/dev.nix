{ pkgs, ... }: {
  channel = "stable-23.11";

  packages = [
    pkgs.openssl.dev
    pkgs.nodejs_latest
  ];

  env = { };

  services.docker.enable = true;

  idx = {

    extensions = [
      "vscodevim.vim"
      "BeardedBear.beardedicons"
      "esbenp.prettier-vscode"
      "Llam4u.nerdtree"
      "teabyii.ayu"
      "humao.rest-client"
      "Supermaven.supermaven"
      "bmewburn.vscode-intelephense-client"
    ];

    previews = {
      enable = false;
    };

    workspace = {
      onCreate = {
        default.openFiles = [ ".idx/dev.nix" ];
      };

      # onStart = {
      #   git-pull = "git pull";
      # };
    };
  };
}
