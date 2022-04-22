import { Injectable } from "@nestjs/common";
import { CachingService } from "src/common/caching/caching.service";
import { QueryPagination } from "src/common/entities/query.paginations";
import { Constants } from "src/utils/constants";
import { Example } from "./entities/example";
import { ExampleFilter } from "./entities/example.filter";

@Injectable()
export class ExampleService {
  constructor(
    private readonly cachingService: CachingService
  ) { }

  async getExamples(pagination: QueryPagination, filter: ExampleFilter): Promise<Example[]> {
    let examples = await this.getAllExamples();

    if (filter.search) {
      const search = filter.search.toLowerCase();

      examples = examples.filter(x => x.description.toLowerCase().includes(search));
    }

    return examples.slice(pagination.from, pagination.from + pagination.size);
  }

  async getExample(id: string): Promise<Example | undefined> {
    const examples = await this.getAllExamples();

    return examples.find(example => example.id === id);
  }

  async getAllExamples(): Promise<Example[]> {
    return await this.cachingService.getOrSetCache(
      'examples',
      async () => await this.getAllExamplesRaw(),
      Constants.oneHour()
    );
  }

  async getAllExamplesRaw(): Promise<Example[]> {
    return await new Promise(resolve => {
      resolve([
        {
          "id": "magna",
          "description": "Excepteur sint reprehenderit sint nostrud esse et do eiusmod excepteur sint voluptate laborum exercitation.",
        },
        {
          "id": "adipisicing",
          "description": "Voluptate in aute sit ad esse est amet in aliquip.",
        },
        {
          "id": "aliquip",
          "description": "Incididunt tempor adipisicing deserunt commodo et duis.",
        },
        {
          "id": "quis",
          "description": "Exercitation exercitation aute reprehenderit duis quis.",
        },
        {
          "id": "adipisicing",
          "description": "Dolore tempor irure labore magna voluptate ipsum Lorem deserunt aliquip veniam ex cupidatat ex.",
        },
        {
          "id": "nostrud",
          "description": "Minim veniam aute magna laboris fugiat duis laboris et.",
        },
        {
          "id": "dolore",
          "description": "Minim irure ut laboris ut pariatur.",
        },
        {
          "id": "sit",
          "description": "Incididunt dolor consectetur dolor do exercitation nostrud ut aliquip reprehenderit nisi fugiat dolor.",
        },
        {
          "id": "fugiat",
          "description": "Commodo adipisicing esse sit ipsum sint.",
        },
        {
          "id": "laborum",
          "description": "Commodo excepteur laborum pariatur consectetur laborum proident excepteur fugiat nisi commodo.",
        },
        {
          "id": "incididunt",
          "description": "Nulla occaecat duis proident commodo adipisicing pariatur eiusmod quis nulla ea anim sit.",
        },
        {
          "id": "est",
          "description": "Deserunt amet esse pariatur consequat laborum elit fugiat Lorem amet ea.",
        },
        {
          "id": "voluptate",
          "description": "Nisi non id id duis ex enim sint.",
        },
        {
          "id": "pariatur",
          "description": "Do dolor nulla elit laboris pariatur magna deserunt minim aliqua officia in velit.",
        },
        {
          "id": "nostrud",
          "description": "Irure elit incididunt nulla consequat magna anim.",
        },
        {
          "id": "proident",
          "description": "Exercitation et eu elit laborum culpa in ut et irure irure.",
        },
        {
          "id": "mollit",
          "description": "Sunt cillum labore pariatur duis do excepteur nisi in.",
        },
        {
          "id": "do",
          "description": "Ullamco eu mollit sit quis irure deserunt irure aliquip enim in.",
        },
        {
          "id": "elit",
          "description": "In non ex veniam sit in adipisicing minim ut irure.",
        },
        {
          "id": "sunt",
          "description": "Sunt nulla qui commodo tempor commodo.",
        },
        {
          "id": "qui",
          "description": "Culpa esse dolore veniam occaecat officia proident incididunt Lorem minim aliqua qui eiusmod elit.",
        },
        {
          "id": "qui",
          "description": "Do anim proident reprehenderit commodo.",
        },
        {
          "id": "duis",
          "description": "Cillum cillum irure voluptate ad duis dolor et irure cillum.",
        },
        {
          "id": "elit",
          "description": "Incididunt aliquip aliqua ea labore exercitation voluptate aute ea consequat nisi.",
        },
        {
          "id": "commodo",
          "description": "Aliquip officia eu ad dolor excepteur esse minim labore non velit anim dolore.",
        },
        {
          "id": "commodo",
          "description": "Qui exercitation sunt nisi incididunt dolor cupidatat.",
        },
        {
          "id": "sit",
          "description": "Id duis labore nostrud anim nostrud deserunt ullamco culpa cupidatat.",
        },
        {
          "id": "laborum",
          "description": "Adipisicing ea Lorem fugiat in ad.",
        },
        {
          "id": "veniam",
          "description": "Enim nulla mollit velit nulla.",
        },
        {
          "id": "amet",
          "description": "Ea sunt sit sunt et dolor deserunt qui proident eiusmod sit consectetur.",
        },
        {
          "id": "in",
          "description": "Occaecat et eiusmod pariatur pariatur sunt nostrud do est Lorem irure commodo duis.",
        },
        {
          "id": "veniam",
          "description": "Deserunt dolore cupidatat enim est quis exercitation duis ea ipsum culpa dolor est ullamco.",
        },
        {
          "id": "dolor",
          "description": "Ullamco labore amet anim minim culpa aute veniam eiusmod pariatur.",
        },
        {
          "id": "laboris",
          "description": "Voluptate irure esse eu incididunt tempor irure culpa sint.",
        },
        {
          "id": "id",
          "description": "Consectetur proident do duis ea consequat id magna ad qui laboris magna fugiat consequat.",
        },
        {
          "id": "minim",
          "description": "Qui commodo sunt nisi duis sunt ipsum voluptate in labore anim.",
        },
        {
          "id": "veniam",
          "description": "Ipsum eu dolor laboris pariatur laborum proident cupidatat.",
        },
        {
          "id": "reprehenderit",
          "description": "Consequat laborum magna et consectetur et adipisicing.",
        },
        {
          "id": "dolore",
          "description": "Ex laboris ut commodo incididunt nulla commodo dolore ut cupidatat.",
        },
        {
          "id": "cupidatat",
          "description": "Est nulla sunt irure consequat mollit amet ullamco sint exercitation.",
        },
        {
          "id": "proident",
          "description": "Eu voluptate fugiat tempor ullamco id ullamco qui quis in aliqua aliquip labore Lorem.",
        },
        {
          "id": "duis",
          "description": "Deserunt eiusmod et laboris non do.",
        },
        {
          "id": "duis",
          "description": "Ullamco sint pariatur magna ea excepteur pariatur.",
        },
        {
          "id": "anim",
          "description": "Voluptate qui sunt officia tempor excepteur culpa cupidatat enim id nisi ut adipisicing.",
        },
        {
          "id": "proident",
          "description": "Excepteur aliquip qui et nisi dolor culpa id id dolore dolore eu eu.",
        },
        {
          "id": "amet",
          "description": "Ex cupidatat pariatur eiusmod ea laboris voluptate ex.",
        },
        {
          "id": "consectetur",
          "description": "Ullamco consequat voluptate proident mollit laborum consequat officia elit labore velit tempor velit.",
        },
        {
          "id": "sunt",
          "description": "Anim ea in esse et et irure fugiat.",
        },
        {
          "id": "amet",
          "description": "Laboris id voluptate voluptate proident minim Lorem ad exercitation excepteur eiusmod amet dolor eu.",
        },
        {
          "id": "id",
          "description": "Quis amet reprehenderit esse officia magna cillum proident non.",
        },
        {
          "id": "occaecat",
          "description": "Aliqua sit Lorem laboris reprehenderit anim.",
        },
        {
          "id": "nulla",
          "description": "Voluptate magna ex eiusmod nisi dolor Lorem enim nulla ut ipsum mollit adipisicing minim.",
        },
        {
          "id": "ad",
          "description": "Duis adipisicing labore ipsum qui cupidatat voluptate qui irure culpa.",
        },
        {
          "id": "cupidatat",
          "description": "Consectetur ex voluptate duis dolore nisi sunt ut nisi enim ut aliquip labore.",
        },
        {
          "id": "ipsum",
          "description": "Dolore nostrud ea fugiat sunt.",
        },
        {
          "id": "do",
          "description": "Et laborum nisi quis reprehenderit ullamco adipisicing labore.",
        },
        {
          "id": "est",
          "description": "Laborum laborum exercitation tempor non adipisicing culpa veniam duis adipisicing dolore qui eiusmod.",
        },
        {
          "id": "ullamco",
          "description": "Et mollit dolor do amet elit ullamco veniam voluptate quis deserunt et.",
        },
        {
          "id": "exercitation",
          "description": "Duis sint magna aliqua amet amet minim enim ea.",
        },
        {
          "id": "cillum",
          "description": "Nisi sint sint eiusmod laborum voluptate non duis quis.",
        },
        {
          "id": "deserunt",
          "description": "Esse fugiat velit ea non dolore culpa magna dolor.",
        },
        {
          "id": "eu",
          "description": "Adipisicing commodo est sunt amet ex velit.",
        },
      ]);
    });
  }
}
