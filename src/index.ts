import { IStyleAPI, IStyleItem } from 'import-sort-style';
import { IImport } from 'import-sort-parser';

function _isLocalModule(imported: IImport): boolean {
  return imported.moduleName.startsWith('~/');
}

function _isAbsoluteModule(imported: IImport): boolean {
  return !imported.moduleName.startsWith('.') && !_isLocalModule(imported);
}

export default function(styleApi: IStyleAPI): IStyleItem[] {
  const {
    alias,
    and,
    dotSegmentCount,
    hasNoMember,
    isNodeModule,
    isRelativeModule,
    moduleName,
    naturally,
    unicode,
  } = styleApi;

  return [
    // import "foo"
    { match: and(hasNoMember, _isAbsoluteModule) },
    { separator: true },

    // import "./foo"
    { match: and(hasNoMember, isRelativeModule) },
    { separator: true },

    // import ... from "fs";
    {
      match: isNodeModule,
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode),
    },
    { separator: true },

    // import ... from "foo";
    {
      match: _isAbsoluteModule,
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode),
    },
    { separator: true },

    // import ... from '~/foo';
    {
      match: _isLocalModule,
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode),
    },
    { separator: true },

    // import ... from "../foo";
    // import ... from "./foo";
    {
      match: isRelativeModule,
      sort: [dotSegmentCount, moduleName(naturally)],
      sortNamedMembers: alias(unicode),
    },
    { separator: true },
  ];
}
