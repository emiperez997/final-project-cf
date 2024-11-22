{ pkgs, ... }: {
  channel = "stable-23.11";

  packages = [
    pkgs.openssl.dev
    pkgs.nodejs_latest
    pkgs.yarn
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
      "Prisma.prisma"
      "ms-azuretools.vscode-docker"
    ];

    previews = {
      enable = false;
    };

    workspace = {
      onCreate = {
        default.openFiles = [ ".idx/dev.nix" ];
      };

      onStart = {
        git-pull = "git pull";
      };
    };
  };
}
