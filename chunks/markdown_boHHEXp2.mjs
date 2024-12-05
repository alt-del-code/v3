import { A as AstroJSX, e as renderJSX, f as createVNode, g as AstroUserError, h as AstroError, E as ExpectedImage, L as LocalImageUsedWrongly, M as MissingImageDimension, U as UnsupportedImageFormat, I as IncompatibleDescriptorOptions, i as UnsupportedImageConversion, N as NoImageMetadata, j as FailedToFetchRemoteImageDimensions, k as ExpectedImageOptions, l as ExpectedNotESMImage, n as InvalidImageService, t as toStyleString, c as createAstro, a as createComponent, o as ImageMissingAlt, r as renderTemplate, m as maybeRenderHead, b as addAttribute, s as spreadAttributes, p as renderUniqueStylesheet, q as renderScriptElement, u as unescapeHTML, v as createHeadAndContent, d as renderComponent, w as isHTMLString, F as Fragment, _ as __astro_tag_component__ } from './astro/server_CW4UvyD6.mjs';
import 'kleur/colors';
import 'clsx';
import Markdoc from '@markdoc/markdoc';
import Slugger from 'github-slugger';
import * as mime from 'mrmime';
/* empty css                         */

const slotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
async function check(Component, props, { default: children = null, ...slotted } = {}) {
  if (typeof Component !== "function") return false;
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  try {
    const result = await Component({ ...props, ...slots, children });
    return result[AstroJSX];
  } catch (e) {
    throwEnhancedErrorIfMdxComponent(e, Component);
  }
  return false;
}
async function renderToStaticMarkup(Component, props = {}, { default: children = null, ...slotted } = {}) {
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  const { result } = this;
  try {
    const html = await renderJSX(result, createVNode(Component, { ...props, ...slots, children }));
    return { html };
  } catch (e) {
    throwEnhancedErrorIfMdxComponent(e, Component);
    throw e;
  }
}
function throwEnhancedErrorIfMdxComponent(error, Component) {
  if (Component[Symbol.for("mdx-component")]) {
    if (AstroUserError.is(error)) return;
    error.title = error.name;
    error.hint = `This issue often occurs when your MDX component encounters runtime errors.`;
    throw error;
  }
}
const renderer = {
  name: "astro:jsx",
  check,
  renderToStaticMarkup
};
var server_default = renderer;

function appendForwardSlash(path) {
  return path.endsWith("/") ? path : path + "/";
}
function prependForwardSlash(path) {
  return path[0] === "/" ? path : "/" + path;
}
function removeTrailingForwardSlash(path) {
  return path.endsWith("/") ? path.slice(0, path.length - 1) : path;
}
function removeLeadingForwardSlash(path) {
  return path.startsWith("/") ? path.substring(1) : path;
}
function trimSlashes(path) {
  return path.replace(/^\/|\/$/g, "");
}
function isString(path) {
  return typeof path === "string" || path instanceof String;
}
function joinPaths(...paths) {
  return paths.filter(isString).map((path, i) => {
    if (i === 0) {
      return removeTrailingForwardSlash(path);
    } else if (i === paths.length - 1) {
      return removeLeadingForwardSlash(path);
    } else {
      return trimSlashes(path);
    }
  }).join("/");
}
function isRemotePath(src) {
  return /^(?:http|ftp|https|ws):?\/\//.test(src) || src.startsWith("data:");
}
function slash(path) {
  return path.replace(/\\/g, "/");
}
function fileExtension(path) {
  const ext = path.split(".").pop();
  return ext !== path ? `.${ext}` : "";
}
function removeBase(path, base) {
  if (path.startsWith(base)) {
    return path.slice(removeTrailingForwardSlash(base).length);
  }
  return path;
}

const VALID_INPUT_FORMATS = [
  "jpeg",
  "jpg",
  "png",
  "tiff",
  "webp",
  "gif",
  "svg",
  "avif"
];
const VALID_SUPPORTED_FORMATS = [
  "jpeg",
  "jpg",
  "png",
  "tiff",
  "webp",
  "gif",
  "svg",
  "avif"
];
const DEFAULT_OUTPUT_FORMAT = "webp";
const DEFAULT_HASH_PROPS = [
  "src",
  "width",
  "height",
  "format",
  "quality",
  "fit",
  "position"
];

const DEFAULT_RESOLUTIONS = [
  640,
  // older and lower-end phones
  750,
  // iPhone 6-8
  828,
  // iPhone XR/11
  960,
  // older horizontal phones
  1080,
  // iPhone 6-8 Plus
  1280,
  // 720p
  1668,
  // Various iPads
  1920,
  // 1080p
  2048,
  // QXGA
  2560,
  // WQXGA
  3200,
  // QHD+
  3840,
  // 4K
  4480,
  // 4.5K
  5120,
  // 5K
  6016
  // 6K
];
const LIMITED_RESOLUTIONS = [
  640,
  // older and lower-end phones
  750,
  // iPhone 6-8
  828,
  // iPhone XR/11
  1080,
  // iPhone 6-8 Plus
  1280,
  // 720p
  1668,
  // Various iPads
  2048,
  // QXGA
  2560
  // WQXGA
];
const getWidths = ({
  width,
  layout,
  breakpoints = DEFAULT_RESOLUTIONS,
  originalWidth
}) => {
  const smallerThanOriginal = (w) => !originalWidth || w <= originalWidth;
  if (layout === "full-width") {
    return breakpoints.filter(smallerThanOriginal);
  }
  if (!width) {
    return [];
  }
  const doubleWidth = width * 2;
  const maxSize = originalWidth ? Math.min(doubleWidth, originalWidth) : doubleWidth;
  if (layout === "fixed") {
    return originalWidth && width > originalWidth ? [originalWidth] : [width, maxSize];
  }
  if (layout === "responsive") {
    return [
      // Always include the image at 1x and 2x the specified width
      width,
      doubleWidth,
      ...breakpoints
    ].filter((w) => w <= maxSize).sort((a, b) => a - b);
  }
  return [];
};
const getSizesAttribute = ({
  width,
  layout
}) => {
  if (!width || !layout) {
    return void 0;
  }
  switch (layout) {
    case `responsive`:
      return `(min-width: ${width}px) ${width}px, 100vw`;
    case `fixed`:
      return `${width}px`;
    case `full-width`:
      return `100vw`;
    case "none":
    default:
      return void 0;
  }
};

function isESMImportedImage(src) {
  return typeof src === "object" || typeof src === "function" && "src" in src;
}
function isRemoteImage(src) {
  return typeof src === "string";
}
async function resolveSrc(src) {
  return typeof src === "object" && "then" in src ? (await src).default ?? await src : src;
}

function matchPattern(url, remotePattern) {
  return matchProtocol(url, remotePattern.protocol) && matchHostname(url, remotePattern.hostname, true) && matchPort(url, remotePattern.port) && matchPathname(url, remotePattern.pathname);
}
function matchPort(url, port) {
  return !port || port === url.port;
}
function matchProtocol(url, protocol) {
  return !protocol || protocol === url.protocol.slice(0, -1);
}
function matchHostname(url, hostname, allowWildcard) {
  if (!hostname) {
    return true;
  } else if (!allowWildcard || !hostname.startsWith("*")) {
    return hostname === url.hostname;
  } else if (hostname.startsWith("**.")) {
    const slicedHostname = hostname.slice(2);
    return slicedHostname !== url.hostname && url.hostname.endsWith(slicedHostname);
  } else if (hostname.startsWith("*.")) {
    const slicedHostname = hostname.slice(1);
    const additionalSubdomains = url.hostname.replace(slicedHostname, "").split(".").filter(Boolean);
    return additionalSubdomains.length === 1;
  }
  return false;
}
function matchPathname(url, pathname, allowWildcard) {
  if (!pathname) {
    return true;
  } else if (!pathname.endsWith("*")) {
    return pathname === url.pathname;
  } else if (pathname.endsWith("/**")) {
    const slicedPathname = pathname.slice(0, -2);
    return slicedPathname !== url.pathname && url.pathname.startsWith(slicedPathname);
  } else if (pathname.endsWith("/*")) {
    const slicedPathname = pathname.slice(0, -1);
    const additionalPathChunks = url.pathname.replace(slicedPathname, "").split("/").filter(Boolean);
    return additionalPathChunks.length === 1;
  }
  return false;
}
function isRemoteAllowed(src, {
  domains = [],
  remotePatterns = []
}) {
  if (!isRemotePath(src)) return false;
  const url = new URL(src);
  return domains.some((domain) => matchHostname(url, domain)) || remotePatterns.some((remotePattern) => matchPattern(url, remotePattern));
}

function isLocalService(service) {
  if (!service) {
    return false;
  }
  return "transform" in service;
}
function parseQuality(quality) {
  let result = parseInt(quality);
  if (Number.isNaN(result)) {
    return quality;
  }
  return result;
}
const sortNumeric = (a, b) => a - b;
const baseService = {
  propertiesToHash: DEFAULT_HASH_PROPS,
  validateOptions(options) {
    if (!options.src || !isRemoteImage(options.src) && !isESMImportedImage(options.src)) {
      throw new AstroError({
        ...ExpectedImage,
        message: ExpectedImage.message(
          JSON.stringify(options.src),
          typeof options.src,
          JSON.stringify(options, (_, v) => v === void 0 ? null : v)
        )
      });
    }
    if (!isESMImportedImage(options.src)) {
      if (options.src.startsWith("/@fs/") || !isRemotePath(options.src) && !options.src.startsWith("/")) {
        throw new AstroError({
          ...LocalImageUsedWrongly,
          message: LocalImageUsedWrongly.message(options.src)
        });
      }
      let missingDimension;
      if (!options.width && !options.height) {
        missingDimension = "both";
      } else if (!options.width && options.height) {
        missingDimension = "width";
      } else if (options.width && !options.height) {
        missingDimension = "height";
      }
      if (missingDimension) {
        throw new AstroError({
          ...MissingImageDimension,
          message: MissingImageDimension.message(missingDimension, options.src)
        });
      }
    } else {
      if (!VALID_SUPPORTED_FORMATS.includes(options.src.format)) {
        throw new AstroError({
          ...UnsupportedImageFormat,
          message: UnsupportedImageFormat.message(
            options.src.format,
            options.src.src,
            VALID_SUPPORTED_FORMATS
          )
        });
      }
      if (options.widths && options.densities) {
        throw new AstroError(IncompatibleDescriptorOptions);
      }
      if (options.src.format === "svg") {
        options.format = "svg";
      }
      if (options.src.format === "svg" && options.format !== "svg" || options.src.format !== "svg" && options.format === "svg") {
        throw new AstroError(UnsupportedImageConversion);
      }
    }
    if (!options.format) {
      options.format = DEFAULT_OUTPUT_FORMAT;
    }
    if (options.width) options.width = Math.round(options.width);
    if (options.height) options.height = Math.round(options.height);
    if (options.layout && options.width && options.height) {
      options.fit ??= "cover";
      delete options.layout;
    }
    if (options.fit === "none") {
      delete options.fit;
    }
    return options;
  },
  getHTMLAttributes(options) {
    const { targetWidth, targetHeight } = getTargetDimensions(options);
    const {
      src,
      width,
      height,
      format,
      quality,
      densities,
      widths,
      formats,
      layout,
      priority,
      fit,
      position,
      ...attributes
    } = options;
    return {
      ...attributes,
      width: targetWidth,
      height: targetHeight,
      loading: attributes.loading ?? "lazy",
      decoding: attributes.decoding ?? "async"
    };
  },
  getSrcSet(options) {
    const { targetWidth, targetHeight } = getTargetDimensions(options);
    const aspectRatio = targetWidth / targetHeight;
    const { widths, densities } = options;
    const targetFormat = options.format ?? DEFAULT_OUTPUT_FORMAT;
    let transformedWidths = (widths ?? []).sort(sortNumeric);
    let imageWidth = options.width;
    let maxWidth = Infinity;
    if (isESMImportedImage(options.src)) {
      imageWidth = options.src.width;
      maxWidth = imageWidth;
      if (transformedWidths.length > 0 && transformedWidths.at(-1) > maxWidth) {
        transformedWidths = transformedWidths.filter((width) => width <= maxWidth);
        transformedWidths.push(maxWidth);
      }
    }
    transformedWidths = Array.from(new Set(transformedWidths));
    const {
      width: transformWidth,
      height: transformHeight,
      ...transformWithoutDimensions
    } = options;
    let allWidths = [];
    if (densities) {
      const densityValues = densities.map((density) => {
        if (typeof density === "number") {
          return density;
        } else {
          return parseFloat(density);
        }
      });
      const densityWidths = densityValues.sort(sortNumeric).map((density) => Math.round(targetWidth * density));
      allWidths = densityWidths.map((width, index) => ({
        width,
        descriptor: `${densityValues[index]}x`
      }));
    } else if (transformedWidths.length > 0) {
      allWidths = transformedWidths.map((width) => ({
        width,
        descriptor: `${width}w`
      }));
    }
    return allWidths.map(({ width, descriptor }) => {
      const height = Math.round(width / aspectRatio);
      const transform = { ...transformWithoutDimensions, width, height };
      return {
        transform,
        descriptor,
        attributes: {
          type: `image/${targetFormat}`
        }
      };
    });
  },
  getURL(options, imageConfig) {
    const searchParams = new URLSearchParams();
    if (isESMImportedImage(options.src)) {
      searchParams.append("href", options.src.src);
    } else if (isRemoteAllowed(options.src, imageConfig)) {
      searchParams.append("href", options.src);
    } else {
      return options.src;
    }
    const params = {
      w: "width",
      h: "height",
      q: "quality",
      f: "format",
      fit: "fit",
      position: "position"
    };
    Object.entries(params).forEach(([param, key]) => {
      options[key] && searchParams.append(param, options[key].toString());
    });
    const imageEndpoint = joinPaths("/v3", imageConfig.endpoint.route);
    return `${imageEndpoint}?${searchParams}`;
  },
  parseURL(url) {
    const params = url.searchParams;
    if (!params.has("href")) {
      return void 0;
    }
    const transform = {
      src: params.get("href"),
      width: params.has("w") ? parseInt(params.get("w")) : void 0,
      height: params.has("h") ? parseInt(params.get("h")) : void 0,
      format: params.get("f"),
      quality: params.get("q"),
      fit: params.get("fit"),
      position: params.get("position") ?? void 0
    };
    return transform;
  }
};
function getTargetDimensions(options) {
  let targetWidth = options.width;
  let targetHeight = options.height;
  if (isESMImportedImage(options.src)) {
    const aspectRatio = options.src.width / options.src.height;
    if (targetHeight && !targetWidth) {
      targetWidth = Math.round(targetHeight * aspectRatio);
    } else if (targetWidth && !targetHeight) {
      targetHeight = Math.round(targetWidth / aspectRatio);
    } else if (!targetWidth && !targetHeight) {
      targetWidth = options.src.width;
      targetHeight = options.src.height;
    }
  }
  return {
    targetWidth,
    targetHeight
  };
}

function isImageMetadata(src) {
  return src.fsPath && !("fsPath" in src);
}

const decoder = new TextDecoder();
const toUTF8String = (input, start = 0, end = input.length) => decoder.decode(input.slice(start, end));
const toHexString = (input, start = 0, end = input.length) => input.slice(start, end).reduce((memo, i) => memo + ("0" + i.toString(16)).slice(-2), "");
const readInt16LE = (input, offset = 0) => {
  const val = input[offset] + input[offset + 1] * 2 ** 8;
  return val | (val & 2 ** 15) * 131070;
};
const readUInt16BE = (input, offset = 0) => input[offset] * 2 ** 8 + input[offset + 1];
const readUInt16LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8;
const readUInt24LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16;
const readInt32LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16 + (input[offset + 3] << 24);
const readUInt32BE = (input, offset = 0) => input[offset] * 2 ** 24 + input[offset + 1] * 2 ** 16 + input[offset + 2] * 2 ** 8 + input[offset + 3];
const readUInt32LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16 + input[offset + 3] * 2 ** 24;
const methods = {
  readUInt16BE,
  readUInt16LE,
  readUInt32BE,
  readUInt32LE
};
function readUInt(input, bits, offset, isBigEndian) {
  offset = offset || 0;
  const endian = isBigEndian ? "BE" : "LE";
  const methodName = "readUInt" + bits + endian;
  return methods[methodName](input, offset);
}
function readBox(buffer, offset) {
  if (buffer.length - offset < 4) return;
  const boxSize = readUInt32BE(buffer, offset);
  if (buffer.length - offset < boxSize) return;
  return {
    name: toUTF8String(buffer, 4 + offset, 8 + offset),
    offset,
    size: boxSize
  };
}
function findBox(buffer, boxName, offset) {
  while (offset < buffer.length) {
    const box = readBox(buffer, offset);
    if (!box) break;
    if (box.name === boxName) return box;
    offset += box.size;
  }
}

const BMP = {
  validate: (input) => toUTF8String(input, 0, 2) === "BM",
  calculate: (input) => ({
    height: Math.abs(readInt32LE(input, 22)),
    width: readUInt32LE(input, 18)
  })
};

const TYPE_ICON = 1;
const SIZE_HEADER$1 = 2 + 2 + 2;
const SIZE_IMAGE_ENTRY = 1 + 1 + 1 + 1 + 2 + 2 + 4 + 4;
function getSizeFromOffset(input, offset) {
  const value = input[offset];
  return value === 0 ? 256 : value;
}
function getImageSize$1(input, imageIndex) {
  const offset = SIZE_HEADER$1 + imageIndex * SIZE_IMAGE_ENTRY;
  return {
    height: getSizeFromOffset(input, offset + 1),
    width: getSizeFromOffset(input, offset)
  };
}
const ICO = {
  validate(input) {
    const reserved = readUInt16LE(input, 0);
    const imageCount = readUInt16LE(input, 4);
    if (reserved !== 0 || imageCount === 0) return false;
    const imageType = readUInt16LE(input, 2);
    return imageType === TYPE_ICON;
  },
  calculate(input) {
    const nbImages = readUInt16LE(input, 4);
    const imageSize = getImageSize$1(input, 0);
    if (nbImages === 1) return imageSize;
    const imgs = [imageSize];
    for (let imageIndex = 1; imageIndex < nbImages; imageIndex += 1) {
      imgs.push(getImageSize$1(input, imageIndex));
    }
    return {
      height: imageSize.height,
      images: imgs,
      width: imageSize.width
    };
  }
};

const TYPE_CURSOR = 2;
const CUR = {
  validate(input) {
    const reserved = readUInt16LE(input, 0);
    const imageCount = readUInt16LE(input, 4);
    if (reserved !== 0 || imageCount === 0) return false;
    const imageType = readUInt16LE(input, 2);
    return imageType === TYPE_CURSOR;
  },
  calculate: (input) => ICO.calculate(input)
};

const DDS = {
  validate: (input) => readUInt32LE(input, 0) === 542327876,
  calculate: (input) => ({
    height: readUInt32LE(input, 12),
    width: readUInt32LE(input, 16)
  })
};

const gifRegexp = /^GIF8[79]a/;
const GIF = {
  validate: (input) => gifRegexp.test(toUTF8String(input, 0, 6)),
  calculate: (input) => ({
    height: readUInt16LE(input, 8),
    width: readUInt16LE(input, 6)
  })
};

const brandMap = {
  avif: "avif",
  mif1: "heif",
  msf1: "heif",
  // hief-sequence
  heic: "heic",
  heix: "heic",
  hevc: "heic",
  // heic-sequence
  hevx: "heic"
  // heic-sequence
};
function detectBrands(buffer, start, end) {
  let brandsDetected = {};
  for (let i = start; i <= end; i += 4) {
    const brand = toUTF8String(buffer, i, i + 4);
    if (brand in brandMap) {
      brandsDetected[brand] = 1;
    }
  }
  if ("avif" in brandsDetected) {
    return "avif";
  } else if ("heic" in brandsDetected || "heix" in brandsDetected || "hevc" in brandsDetected || "hevx" in brandsDetected) {
    return "heic";
  } else if ("mif1" in brandsDetected || "msf1" in brandsDetected) {
    return "heif";
  }
}
const HEIF = {
  validate(buffer) {
    const ftype = toUTF8String(buffer, 4, 8);
    const brand = toUTF8String(buffer, 8, 12);
    return "ftyp" === ftype && brand in brandMap;
  },
  calculate(buffer) {
    const metaBox = findBox(buffer, "meta", 0);
    const iprpBox = metaBox && findBox(buffer, "iprp", metaBox.offset + 12);
    const ipcoBox = iprpBox && findBox(buffer, "ipco", iprpBox.offset + 8);
    const ispeBox = ipcoBox && findBox(buffer, "ispe", ipcoBox.offset + 8);
    if (ispeBox) {
      return {
        height: readUInt32BE(buffer, ispeBox.offset + 16),
        width: readUInt32BE(buffer, ispeBox.offset + 12),
        type: detectBrands(buffer, 8, metaBox.offset)
      };
    }
    throw new TypeError("Invalid HEIF, no size found");
  }
};

const SIZE_HEADER = 4 + 4;
const FILE_LENGTH_OFFSET = 4;
const ENTRY_LENGTH_OFFSET = 4;
const ICON_TYPE_SIZE = {
  ICON: 32,
  "ICN#": 32,
  // m => 16 x 16
  "icm#": 16,
  icm4: 16,
  icm8: 16,
  // s => 16 x 16
  "ics#": 16,
  ics4: 16,
  ics8: 16,
  is32: 16,
  s8mk: 16,
  icp4: 16,
  // l => 32 x 32
  icl4: 32,
  icl8: 32,
  il32: 32,
  l8mk: 32,
  icp5: 32,
  ic11: 32,
  // h => 48 x 48
  ich4: 48,
  ich8: 48,
  ih32: 48,
  h8mk: 48,
  // . => 64 x 64
  icp6: 64,
  ic12: 32,
  // t => 128 x 128
  it32: 128,
  t8mk: 128,
  ic07: 128,
  // . => 256 x 256
  ic08: 256,
  ic13: 256,
  // . => 512 x 512
  ic09: 512,
  ic14: 512,
  // . => 1024 x 1024
  ic10: 1024
};
function readImageHeader(input, imageOffset) {
  const imageLengthOffset = imageOffset + ENTRY_LENGTH_OFFSET;
  return [
    toUTF8String(input, imageOffset, imageLengthOffset),
    readUInt32BE(input, imageLengthOffset)
  ];
}
function getImageSize(type) {
  const size = ICON_TYPE_SIZE[type];
  return { width: size, height: size, type };
}
const ICNS = {
  validate: (input) => toUTF8String(input, 0, 4) === "icns",
  calculate(input) {
    const inputLength = input.length;
    const fileLength = readUInt32BE(input, FILE_LENGTH_OFFSET);
    let imageOffset = SIZE_HEADER;
    let imageHeader = readImageHeader(input, imageOffset);
    let imageSize = getImageSize(imageHeader[0]);
    imageOffset += imageHeader[1];
    if (imageOffset === fileLength) return imageSize;
    const result = {
      height: imageSize.height,
      images: [imageSize],
      width: imageSize.width
    };
    while (imageOffset < fileLength && imageOffset < inputLength) {
      imageHeader = readImageHeader(input, imageOffset);
      imageSize = getImageSize(imageHeader[0]);
      imageOffset += imageHeader[1];
      result.images.push(imageSize);
    }
    return result;
  }
};

const J2C = {
  // TODO: this doesn't seem right. SIZ marker doesn't have to be right after the SOC
  validate: (input) => toHexString(input, 0, 4) === "ff4fff51",
  calculate: (input) => ({
    height: readUInt32BE(input, 12),
    width: readUInt32BE(input, 8)
  })
};

const JP2 = {
  validate(input) {
    if (readUInt32BE(input, 4) !== 1783636e3 || readUInt32BE(input, 0) < 1) return false;
    const ftypBox = findBox(input, "ftyp", 0);
    if (!ftypBox) return false;
    return readUInt32BE(input, ftypBox.offset + 4) === 1718909296;
  },
  calculate(input) {
    const jp2hBox = findBox(input, "jp2h", 0);
    const ihdrBox = jp2hBox && findBox(input, "ihdr", jp2hBox.offset + 8);
    if (ihdrBox) {
      return {
        height: readUInt32BE(input, ihdrBox.offset + 8),
        width: readUInt32BE(input, ihdrBox.offset + 12)
      };
    }
    throw new TypeError("Unsupported JPEG 2000 format");
  }
};

const EXIF_MARKER = "45786966";
const APP1_DATA_SIZE_BYTES = 2;
const EXIF_HEADER_BYTES = 6;
const TIFF_BYTE_ALIGN_BYTES = 2;
const BIG_ENDIAN_BYTE_ALIGN = "4d4d";
const LITTLE_ENDIAN_BYTE_ALIGN = "4949";
const IDF_ENTRY_BYTES = 12;
const NUM_DIRECTORY_ENTRIES_BYTES = 2;
function isEXIF(input) {
  return toHexString(input, 2, 6) === EXIF_MARKER;
}
function extractSize(input, index) {
  return {
    height: readUInt16BE(input, index),
    width: readUInt16BE(input, index + 2)
  };
}
function extractOrientation(exifBlock, isBigEndian) {
  const idfOffset = 8;
  const offset = EXIF_HEADER_BYTES + idfOffset;
  const idfDirectoryEntries = readUInt(exifBlock, 16, offset, isBigEndian);
  for (let directoryEntryNumber = 0; directoryEntryNumber < idfDirectoryEntries; directoryEntryNumber++) {
    const start = offset + NUM_DIRECTORY_ENTRIES_BYTES + directoryEntryNumber * IDF_ENTRY_BYTES;
    const end = start + IDF_ENTRY_BYTES;
    if (start > exifBlock.length) {
      return;
    }
    const block = exifBlock.slice(start, end);
    const tagNumber = readUInt(block, 16, 0, isBigEndian);
    if (tagNumber === 274) {
      const dataFormat = readUInt(block, 16, 2, isBigEndian);
      if (dataFormat !== 3) {
        return;
      }
      const numberOfComponents = readUInt(block, 32, 4, isBigEndian);
      if (numberOfComponents !== 1) {
        return;
      }
      return readUInt(block, 16, 8, isBigEndian);
    }
  }
}
function validateExifBlock(input, index) {
  const exifBlock = input.slice(APP1_DATA_SIZE_BYTES, index);
  const byteAlign = toHexString(
    exifBlock,
    EXIF_HEADER_BYTES,
    EXIF_HEADER_BYTES + TIFF_BYTE_ALIGN_BYTES
  );
  const isBigEndian = byteAlign === BIG_ENDIAN_BYTE_ALIGN;
  const isLittleEndian = byteAlign === LITTLE_ENDIAN_BYTE_ALIGN;
  if (isBigEndian || isLittleEndian) {
    return extractOrientation(exifBlock, isBigEndian);
  }
}
function validateInput(input, index) {
  if (index > input.length) {
    throw new TypeError("Corrupt JPG, exceeded buffer limits");
  }
}
const JPG = {
  validate: (input) => toHexString(input, 0, 2) === "ffd8",
  calculate(input) {
    input = input.slice(4);
    let orientation;
    let next;
    while (input.length) {
      const i = readUInt16BE(input, 0);
      if (input[i] !== 255) {
        input = input.slice(i);
        continue;
      }
      if (isEXIF(input)) {
        orientation = validateExifBlock(input, i);
      }
      validateInput(input, i);
      next = input[i + 1];
      if (next === 192 || next === 193 || next === 194) {
        const size = extractSize(input, i + 5);
        if (!orientation) {
          return size;
        }
        return {
          height: size.height,
          orientation,
          width: size.width
        };
      }
      input = input.slice(i + 2);
    }
    throw new TypeError("Invalid JPG, no size found");
  }
};

const KTX = {
  validate: (input) => {
    const signature = toUTF8String(input, 1, 7);
    return ["KTX 11", "KTX 20"].includes(signature);
  },
  calculate: (input) => {
    const type = input[5] === 49 ? "ktx" : "ktx2";
    const offset = type === "ktx" ? 36 : 20;
    return {
      height: readUInt32LE(input, offset + 4),
      width: readUInt32LE(input, offset),
      type
    };
  }
};

const pngSignature = "PNG\r\n\n";
const pngImageHeaderChunkName = "IHDR";
const pngFriedChunkName = "CgBI";
const PNG = {
  validate(input) {
    if (pngSignature === toUTF8String(input, 1, 8)) {
      let chunkName = toUTF8String(input, 12, 16);
      if (chunkName === pngFriedChunkName) {
        chunkName = toUTF8String(input, 28, 32);
      }
      if (chunkName !== pngImageHeaderChunkName) {
        throw new TypeError("Invalid PNG");
      }
      return true;
    }
    return false;
  },
  calculate(input) {
    if (toUTF8String(input, 12, 16) === pngFriedChunkName) {
      return {
        height: readUInt32BE(input, 36),
        width: readUInt32BE(input, 32)
      };
    }
    return {
      height: readUInt32BE(input, 20),
      width: readUInt32BE(input, 16)
    };
  }
};

const PNMTypes = {
  P1: "pbm/ascii",
  P2: "pgm/ascii",
  P3: "ppm/ascii",
  P4: "pbm",
  P5: "pgm",
  P6: "ppm",
  P7: "pam",
  PF: "pfm"
};
const handlers = {
  default: (lines) => {
    let dimensions = [];
    while (lines.length > 0) {
      const line = lines.shift();
      if (line[0] === "#") {
        continue;
      }
      dimensions = line.split(" ");
      break;
    }
    if (dimensions.length === 2) {
      return {
        height: parseInt(dimensions[1], 10),
        width: parseInt(dimensions[0], 10)
      };
    } else {
      throw new TypeError("Invalid PNM");
    }
  },
  pam: (lines) => {
    const size = {};
    while (lines.length > 0) {
      const line = lines.shift();
      if (line.length > 16 || line.charCodeAt(0) > 128) {
        continue;
      }
      const [key, value] = line.split(" ");
      if (key && value) {
        size[key.toLowerCase()] = parseInt(value, 10);
      }
      if (size.height && size.width) {
        break;
      }
    }
    if (size.height && size.width) {
      return {
        height: size.height,
        width: size.width
      };
    } else {
      throw new TypeError("Invalid PAM");
    }
  }
};
const PNM = {
  validate: (input) => toUTF8String(input, 0, 2) in PNMTypes,
  calculate(input) {
    const signature = toUTF8String(input, 0, 2);
    const type = PNMTypes[signature];
    const lines = toUTF8String(input, 3).split(/[\r\n]+/);
    const handler = handlers[type] || handlers.default;
    return handler(lines);
  }
};

const PSD = {
  validate: (input) => toUTF8String(input, 0, 4) === "8BPS",
  calculate: (input) => ({
    height: readUInt32BE(input, 14),
    width: readUInt32BE(input, 18)
  })
};

const svgReg = /<svg\s([^>"']|"[^"]*"|'[^']*')*>/;
const extractorRegExps = {
  height: /\sheight=(['"])([^%]+?)\1/,
  root: svgReg,
  viewbox: /\sviewBox=(['"])(.+?)\1/i,
  width: /\swidth=(['"])([^%]+?)\1/
};
const INCH_CM = 2.54;
const units = {
  in: 96,
  cm: 96 / INCH_CM,
  em: 16,
  ex: 8,
  m: 96 / INCH_CM * 100,
  mm: 96 / INCH_CM / 10,
  pc: 96 / 72 / 12,
  pt: 96 / 72,
  px: 1
};
const unitsReg = new RegExp(
  `^([0-9.]+(?:e\\d+)?)(${Object.keys(units).join("|")})?$`
);
function parseLength(len) {
  const m = unitsReg.exec(len);
  if (!m) {
    return void 0;
  }
  return Math.round(Number(m[1]) * (units[m[2]] || 1));
}
function parseViewbox(viewbox) {
  const bounds = viewbox.split(" ");
  return {
    height: parseLength(bounds[3]),
    width: parseLength(bounds[2])
  };
}
function parseAttributes(root) {
  const width = extractorRegExps.width.exec(root);
  const height = extractorRegExps.height.exec(root);
  const viewbox = extractorRegExps.viewbox.exec(root);
  return {
    height: height && parseLength(height[2]),
    viewbox: viewbox && parseViewbox(viewbox[2]),
    width: width && parseLength(width[2])
  };
}
function calculateByDimensions(attrs) {
  return {
    height: attrs.height,
    width: attrs.width
  };
}
function calculateByViewbox(attrs, viewbox) {
  const ratio = viewbox.width / viewbox.height;
  if (attrs.width) {
    return {
      height: Math.floor(attrs.width / ratio),
      width: attrs.width
    };
  }
  if (attrs.height) {
    return {
      height: attrs.height,
      width: Math.floor(attrs.height * ratio)
    };
  }
  return {
    height: viewbox.height,
    width: viewbox.width
  };
}
const SVG = {
  // Scan only the first kilo-byte to speed up the check on larger files
  validate: (input) => svgReg.test(toUTF8String(input, 0, 1e3)),
  calculate(input) {
    const root = extractorRegExps.root.exec(toUTF8String(input));
    if (root) {
      const attrs = parseAttributes(root[0]);
      if (attrs.width && attrs.height) {
        return calculateByDimensions(attrs);
      }
      if (attrs.viewbox) {
        return calculateByViewbox(attrs, attrs.viewbox);
      }
    }
    throw new TypeError("Invalid SVG");
  }
};

const TGA = {
  validate(input) {
    return readUInt16LE(input, 0) === 0 && readUInt16LE(input, 4) === 0;
  },
  calculate(input) {
    return {
      height: readUInt16LE(input, 14),
      width: readUInt16LE(input, 12)
    };
  }
};

function readIFD(input, isBigEndian) {
  const ifdOffset = readUInt(input, 32, 4, isBigEndian);
  return input.slice(ifdOffset + 2);
}
function readValue(input, isBigEndian) {
  const low = readUInt(input, 16, 8, isBigEndian);
  const high = readUInt(input, 16, 10, isBigEndian);
  return (high << 16) + low;
}
function nextTag(input) {
  if (input.length > 24) {
    return input.slice(12);
  }
}
function extractTags(input, isBigEndian) {
  const tags = {};
  let temp = input;
  while (temp && temp.length) {
    const code = readUInt(temp, 16, 0, isBigEndian);
    const type = readUInt(temp, 16, 2, isBigEndian);
    const length = readUInt(temp, 32, 4, isBigEndian);
    if (code === 0) {
      break;
    } else {
      if (length === 1 && (type === 3 || type === 4)) {
        tags[code] = readValue(temp, isBigEndian);
      }
      temp = nextTag(temp);
    }
  }
  return tags;
}
function determineEndianness(input) {
  const signature = toUTF8String(input, 0, 2);
  if ("II" === signature) {
    return "LE";
  } else if ("MM" === signature) {
    return "BE";
  }
}
const signatures = [
  // '492049', // currently not supported
  "49492a00",
  // Little endian
  "4d4d002a"
  // Big Endian
  // '4d4d002a', // BigTIFF > 4GB. currently not supported
];
const TIFF = {
  validate: (input) => signatures.includes(toHexString(input, 0, 4)),
  calculate(input) {
    const isBigEndian = determineEndianness(input) === "BE";
    const ifdBuffer = readIFD(input, isBigEndian);
    const tags = extractTags(ifdBuffer, isBigEndian);
    const width = tags[256];
    const height = tags[257];
    if (!width || !height) {
      throw new TypeError("Invalid Tiff. Missing tags");
    }
    return { height, width };
  }
};

function calculateExtended(input) {
  return {
    height: 1 + readUInt24LE(input, 7),
    width: 1 + readUInt24LE(input, 4)
  };
}
function calculateLossless(input) {
  return {
    height: 1 + ((input[4] & 15) << 10 | input[3] << 2 | (input[2] & 192) >> 6),
    width: 1 + ((input[2] & 63) << 8 | input[1])
  };
}
function calculateLossy(input) {
  return {
    height: readInt16LE(input, 8) & 16383,
    width: readInt16LE(input, 6) & 16383
  };
}
const WEBP = {
  validate(input) {
    const riffHeader = "RIFF" === toUTF8String(input, 0, 4);
    const webpHeader = "WEBP" === toUTF8String(input, 8, 12);
    const vp8Header = "VP8" === toUTF8String(input, 12, 15);
    return riffHeader && webpHeader && vp8Header;
  },
  calculate(input) {
    const chunkHeader = toUTF8String(input, 12, 16);
    input = input.slice(20, 30);
    if (chunkHeader === "VP8X") {
      const extendedHeader = input[0];
      const validStart = (extendedHeader & 192) === 0;
      const validEnd = (extendedHeader & 1) === 0;
      if (validStart && validEnd) {
        return calculateExtended(input);
      } else {
        throw new TypeError("Invalid WebP");
      }
    }
    if (chunkHeader === "VP8 " && input[0] !== 47) {
      return calculateLossy(input);
    }
    const signature = toHexString(input, 3, 6);
    if (chunkHeader === "VP8L" && signature !== "9d012a") {
      return calculateLossless(input);
    }
    throw new TypeError("Invalid WebP");
  }
};

const typeHandlers = /* @__PURE__ */ new Map([
  ["bmp", BMP],
  ["cur", CUR],
  ["dds", DDS],
  ["gif", GIF],
  ["heif", HEIF],
  ["icns", ICNS],
  ["ico", ICO],
  ["j2c", J2C],
  ["jp2", JP2],
  ["jpg", JPG],
  ["ktx", KTX],
  ["png", PNG],
  ["pnm", PNM],
  ["psd", PSD],
  ["svg", SVG],
  ["tga", TGA],
  ["tiff", TIFF],
  ["webp", WEBP]
]);
const types = Array.from(typeHandlers.keys());

const firstBytes = /* @__PURE__ */ new Map([
  [56, "psd"],
  [66, "bmp"],
  [68, "dds"],
  [71, "gif"],
  [73, "tiff"],
  [77, "tiff"],
  [82, "webp"],
  [105, "icns"],
  [137, "png"],
  [255, "jpg"]
]);
function detector(input) {
  const byte = input[0];
  const type = firstBytes.get(byte);
  if (type && typeHandlers.get(type).validate(input)) {
    return type;
  }
  return types.find((fileType) => typeHandlers.get(fileType).validate(input));
}

const globalOptions = {
  disabledTypes: []
};
function lookup(input) {
  const type = detector(input);
  if (typeof type !== "undefined") {
    if (globalOptions.disabledTypes.includes(type)) {
      throw new TypeError("disabled file type: " + type);
    }
    const size = typeHandlers.get(type).calculate(input);
    if (size !== void 0) {
      size.type = size.type ?? type;
      return size;
    }
  }
  throw new TypeError("unsupported file type: " + type);
}

async function imageMetadata(data, src) {
  try {
    const result = lookup(data);
    if (!result.height || !result.width || !result.type) {
      throw new AstroError({
        ...NoImageMetadata,
        message: NoImageMetadata.message(src)
      });
    }
    const { width, height, type, orientation } = result;
    const isPortrait = (orientation || 0) >= 5;
    return {
      width: isPortrait ? height : width,
      height: isPortrait ? width : height,
      format: type,
      orientation
    };
  } catch {
    throw new AstroError({
      ...NoImageMetadata,
      message: NoImageMetadata.message(src)
    });
  }
}

async function inferRemoteSize(url) {
  const response = await fetch(url);
  if (!response.body || !response.ok) {
    throw new AstroError({
      ...FailedToFetchRemoteImageDimensions,
      message: FailedToFetchRemoteImageDimensions.message(url)
    });
  }
  const reader = response.body.getReader();
  let done, value;
  let accumulatedChunks = new Uint8Array();
  while (!done) {
    const readResult = await reader.read();
    done = readResult.done;
    if (done) break;
    if (readResult.value) {
      value = readResult.value;
      let tmp = new Uint8Array(accumulatedChunks.length + value.length);
      tmp.set(accumulatedChunks, 0);
      tmp.set(value, accumulatedChunks.length);
      accumulatedChunks = tmp;
      try {
        const dimensions = await imageMetadata(accumulatedChunks, url);
        if (dimensions) {
          await reader.cancel();
          return dimensions;
        }
      } catch {
      }
    }
  }
  throw new AstroError({
    ...NoImageMetadata,
    message: NoImageMetadata.message(url)
  });
}

async function getConfiguredImageService() {
  if (!globalThis?.astroAsset?.imageService) {
    const { default: service } = await import(
      // @ts-expect-error
      './sharp_CV75RC39.mjs'
    ).catch((e) => {
      const error = new AstroError(InvalidImageService);
      error.cause = e;
      throw error;
    });
    if (!globalThis.astroAsset) globalThis.astroAsset = {};
    globalThis.astroAsset.imageService = service;
    return service;
  }
  return globalThis.astroAsset.imageService;
}
async function getImage$1(options, imageConfig) {
  if (!options || typeof options !== "object") {
    throw new AstroError({
      ...ExpectedImageOptions,
      message: ExpectedImageOptions.message(JSON.stringify(options))
    });
  }
  if (typeof options.src === "undefined") {
    throw new AstroError({
      ...ExpectedImage,
      message: ExpectedImage.message(
        options.src,
        "undefined",
        JSON.stringify(options)
      )
    });
  }
  if (isImageMetadata(options)) {
    throw new AstroError(ExpectedNotESMImage);
  }
  const service = await getConfiguredImageService();
  const resolvedOptions = {
    ...options,
    src: await resolveSrc(options.src)
  };
  let originalWidth;
  let originalHeight;
  let originalFormat;
  if (options.inferSize && isRemoteImage(resolvedOptions.src) && isRemotePath(resolvedOptions.src)) {
    const result = await inferRemoteSize(resolvedOptions.src);
    resolvedOptions.width ??= result.width;
    resolvedOptions.height ??= result.height;
    originalWidth = result.width;
    originalHeight = result.height;
    originalFormat = result.format;
    delete resolvedOptions.inferSize;
  }
  const originalFilePath = isESMImportedImage(resolvedOptions.src) ? resolvedOptions.src.fsPath : void 0;
  const clonedSrc = isESMImportedImage(resolvedOptions.src) ? (
    // @ts-expect-error - clone is a private, hidden prop
    resolvedOptions.src.clone ?? resolvedOptions.src
  ) : resolvedOptions.src;
  if (isESMImportedImage(clonedSrc)) {
    originalWidth = clonedSrc.width;
    originalHeight = clonedSrc.height;
    originalFormat = clonedSrc.format;
  }
  if (originalWidth && originalHeight) {
    const aspectRatio = originalWidth / originalHeight;
    if (resolvedOptions.height && !resolvedOptions.width) {
      resolvedOptions.width = Math.round(resolvedOptions.height * aspectRatio);
    } else if (resolvedOptions.width && !resolvedOptions.height) {
      resolvedOptions.height = Math.round(resolvedOptions.width / aspectRatio);
    } else if (!resolvedOptions.width && !resolvedOptions.height) {
      resolvedOptions.width = originalWidth;
      resolvedOptions.height = originalHeight;
    }
  }
  resolvedOptions.src = clonedSrc;
  const layout = options.layout ?? imageConfig.experimentalLayout;
  if (imageConfig.experimentalResponsiveImages && layout) {
    resolvedOptions.widths ||= getWidths({
      width: resolvedOptions.width,
      layout,
      originalWidth,
      breakpoints: imageConfig.experimentalBreakpoints?.length ? imageConfig.experimentalBreakpoints : isLocalService(service) ? LIMITED_RESOLUTIONS : DEFAULT_RESOLUTIONS
    });
    resolvedOptions.sizes ||= getSizesAttribute({ width: resolvedOptions.width, layout });
    if (resolvedOptions.priority) {
      resolvedOptions.loading ??= "eager";
      resolvedOptions.decoding ??= "sync";
      resolvedOptions.fetchpriority ??= "high";
    } else {
      resolvedOptions.loading ??= "lazy";
      resolvedOptions.decoding ??= "async";
      resolvedOptions.fetchpriority ??= "auto";
    }
    delete resolvedOptions.priority;
    delete resolvedOptions.densities;
  }
  const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig) : resolvedOptions;
  const srcSetTransforms = service.getSrcSet ? await service.getSrcSet(validatedOptions, imageConfig) : [];
  let imageURL = await service.getURL(validatedOptions, imageConfig);
  const matchesOriginal = (transform) => transform.width === originalWidth && transform.height === originalHeight && transform.format === originalFormat;
  let srcSets = await Promise.all(
    srcSetTransforms.map(async (srcSet) => {
      return {
        transform: srcSet.transform,
        url: matchesOriginal(srcSet.transform) ? imageURL : await service.getURL(srcSet.transform, imageConfig),
        descriptor: srcSet.descriptor,
        attributes: srcSet.attributes
      };
    })
  );
  if (isLocalService(service) && globalThis.astroAsset.addStaticImage && !(isRemoteImage(validatedOptions.src) && imageURL === validatedOptions.src)) {
    const propsToHash = service.propertiesToHash ?? DEFAULT_HASH_PROPS;
    imageURL = globalThis.astroAsset.addStaticImage(
      validatedOptions,
      propsToHash,
      originalFilePath
    );
    srcSets = srcSetTransforms.map((srcSet) => {
      return {
        transform: srcSet.transform,
        url: matchesOriginal(srcSet.transform) ? imageURL : globalThis.astroAsset.addStaticImage(srcSet.transform, propsToHash, originalFilePath),
        descriptor: srcSet.descriptor,
        attributes: srcSet.attributes
      };
    });
  }
  return {
    rawOptions: resolvedOptions,
    options: validatedOptions,
    src: imageURL,
    srcSet: {
      values: srcSets,
      attribute: srcSets.map((srcSet) => `${srcSet.url} ${srcSet.descriptor}`).join(", ")
    },
    attributes: service.getHTMLAttributes !== void 0 ? await service.getHTMLAttributes(validatedOptions, imageConfig) : {}
  };
}

function addCSSVarsToStyle(vars, styles) {
  const cssVars = Object.entries(vars).filter(([_, value]) => value !== void 0 && value !== false).map(([key, value]) => `--${key}: ${value};`).join(" ");
  if (!styles) {
    return cssVars;
  }
  const style = typeof styles === "string" ? styles : toStyleString(styles);
  return `${cssVars} ${style}`;
}
const cssFitValues = ["fill", "contain", "cover", "scale-down"];
function applyResponsiveAttributes({
  layout,
  image,
  props,
  additionalAttributes
}) {
  const attributes = { ...additionalAttributes, ...image.attributes };
  attributes.style = addCSSVarsToStyle(
    {
      w: image.attributes.width ?? props.width ?? image.options.width,
      h: image.attributes.height ?? props.height ?? image.options.height,
      fit: cssFitValues.includes(props.fit ?? "") && props.fit,
      pos: props.position
    },
    attributes.style
  );
  attributes["data-astro-image"] = layout;
  return attributes;
}

const $$Astro$2 = createAstro("https://alt-del-code.github.io");
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const layout = props.layout ?? imageConfig.experimentalLayout ?? "none";
  const useResponsive = imageConfig.experimentalResponsiveImages && layout !== "none";
  if (useResponsive) {
    props.layout ??= imageConfig.experimentalLayout;
    props.fit ??= imageConfig.experimentalObjectFit ?? "cover";
    props.position ??= imageConfig.experimentalObjectPosition ?? "center";
  }
  const image = await getImage(props);
  const additionalAttributes = {};
  if (image.srcSet.values.length > 0) {
    additionalAttributes.srcset = image.srcSet.attribute;
  }
  const { class: className, ...attributes } = useResponsive ? applyResponsiveAttributes({
    layout,
    image,
    props,
    additionalAttributes
  }) : { ...additionalAttributes, ...image.attributes };
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(attributes)}${addAttribute(className, "class")}>`;
}, "D:/krrish/v3/node_modules/astro/components/Image.astro", void 0);

const $$Astro$1 = createAstro("https://alt-del-code.github.io");
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Picture;
  const defaultFormats = ["webp"];
  const defaultFallbackFormat = "png";
  const specialFormatsFallback = ["gif", "svg", "jpg", "jpeg"];
  const { formats = defaultFormats, pictureAttributes = {}, fallbackFormat, ...props } = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  const scopedStyleClass = props.class?.match(/\bastro-\w{8}\b/)?.[0];
  if (scopedStyleClass) {
    if (pictureAttributes.class) {
      pictureAttributes.class = `${pictureAttributes.class} ${scopedStyleClass}`;
    } else {
      pictureAttributes.class = scopedStyleClass;
    }
  }
  const layout = props.layout ?? imageConfig.experimentalLayout ?? "none";
  const useResponsive = imageConfig.experimentalResponsiveImages && layout !== "none";
  if (useResponsive) {
    props.layout ??= imageConfig.experimentalLayout;
    props.fit ??= imageConfig.experimentalObjectFit ?? "cover";
    props.position ??= imageConfig.experimentalObjectPosition ?? "center";
  }
  for (const key in props) {
    if (key.startsWith("data-astro-cid")) {
      pictureAttributes[key] = props[key];
    }
  }
  const originalSrc = await resolveSrc(props.src);
  const optimizedImages = await Promise.all(
    formats.map(
      async (format) => await getImage({
        ...props,
        src: originalSrc,
        format,
        widths: props.widths,
        densities: props.densities
      })
    )
  );
  let resultFallbackFormat = fallbackFormat ?? defaultFallbackFormat;
  if (!fallbackFormat && isESMImportedImage(originalSrc) && specialFormatsFallback.includes(originalSrc.format)) {
    resultFallbackFormat = originalSrc.format;
  }
  const fallbackImage = await getImage({
    ...props,
    format: resultFallbackFormat,
    widths: props.widths,
    densities: props.densities
  });
  const imgAdditionalAttributes = {};
  const sourceAdditionalAttributes = {};
  if (props.sizes) {
    sourceAdditionalAttributes.sizes = props.sizes;
  }
  if (fallbackImage.srcSet.values.length > 0) {
    imgAdditionalAttributes.srcset = fallbackImage.srcSet.attribute;
  }
  const { class: className, ...attributes } = useResponsive ? applyResponsiveAttributes({
    layout,
    image: fallbackImage,
    props,
    additionalAttributes: imgAdditionalAttributes
  }) : { ...imgAdditionalAttributes, ...fallbackImage.attributes };
  return renderTemplate`${maybeRenderHead()}<picture${spreadAttributes(pictureAttributes)}> ${Object.entries(optimizedImages).map(([_, image]) => {
    const srcsetAttribute = props.densities || !props.densities && !props.widths && !useResponsive ? `${image.src}${image.srcSet.values.length > 0 ? ", " + image.srcSet.attribute : ""}` : image.srcSet.attribute;
    return renderTemplate`<source${addAttribute(srcsetAttribute, "srcset")}${addAttribute(mime.lookup(image.options.format ?? image.src) ?? `image/${image.options.format}`, "type")}${spreadAttributes(sourceAdditionalAttributes)}>`;
  })}  <img${addAttribute(fallbackImage.src, "src")}${spreadAttributes(attributes)}${addAttribute(className, "class")}> </picture>`;
}, "D:/krrish/v3/node_modules/astro/components/Picture.astro", void 0);

const imageConfig = {"endpoint":{"route":"/_image"},"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"domains":[],"remotePatterns":[{"protocol":"https"}],"experimentalResponsiveImages":false};
					const getImage = async (options) => await getImage$1(options, imageConfig);

const _astro_assets = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Image: $$Image,
  getConfiguredImageService,
  getImage,
  imageConfig,
  inferRemoteSize,
  isLocalService
}, Symbol.toStringTag, { value: 'Module' }));

async function getMod$4() {
						return Promise.resolve().then(() => slide2);
					}
					const collectedLinks$4 = [];
					const collectedStyles$4 = ["[data-astro-image]{width:100%;height:auto;-o-object-fit:var(--fit);object-fit:var(--fit);-o-object-position:var(--pos);object-position:var(--pos);aspect-ratio:var(--w) / var(--h)}[data-astro-image=responsive]{max-width:calc(var(--w) * 1px);max-height:calc(var(--h) * 1px)}[data-astro-image=fixed]{width:calc(var(--w) * 1px);height:calc(var(--h) * 1px)}\n"];
					const defaultMod$4 = { __astroPropagation: true, getMod: getMod$4, collectedLinks: collectedLinks$4, collectedStyles: collectedStyles$4, collectedScripts: [] };

const slide2$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: defaultMod$4
}, Symbol.toStringTag, { value: 'Module' }));

async function getMod$3() {
						return Promise.resolve().then(() => slide1);
					}
					const collectedLinks$3 = "@@ASTRO-LINKS@@";
					const collectedStyles$3 = "@@ASTRO-STYLES@@";
					const defaultMod$3 = { __astroPropagation: true, getMod: getMod$3, collectedLinks: collectedLinks$3, collectedStyles: collectedStyles$3, collectedScripts: [] };

const slide1$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: defaultMod$3
}, Symbol.toStringTag, { value: 'Module' }));

async function getMod$2() {
						return Promise.resolve().then(() => slide3);
					}
					const collectedLinks$2 = "@@ASTRO-LINKS@@";
					const collectedStyles$2 = "@@ASTRO-STYLES@@";
					const defaultMod$2 = { __astroPropagation: true, getMod: getMod$2, collectedLinks: collectedLinks$2, collectedStyles: collectedStyles$2, collectedScripts: [] };

const slide3$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: defaultMod$2
}, Symbol.toStringTag, { value: 'Module' }));

async function getMod$1() {
						return Promise.resolve().then(() => slide4);
					}
					const collectedLinks$1 = "@@ASTRO-LINKS@@";
					const collectedStyles$1 = "@@ASTRO-STYLES@@";
					const defaultMod$1 = { __astroPropagation: true, getMod: getMod$1, collectedLinks: collectedLinks$1, collectedStyles: collectedStyles$1, collectedScripts: [] };

const slide4$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: defaultMod$1
}, Symbol.toStringTag, { value: 'Module' }));

async function getMod() {
						return Promise.resolve().then(() => main);
					}
					const collectedLinks = "@@ASTRO-LINKS@@";
					const collectedStyles = "@@ASTRO-STYLES@@";
					const defaultMod = { __astroPropagation: true, getMod, collectedLinks, collectedStyles, collectedScripts: [] };

const main$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: defaultMod
}, Symbol.toStringTag, { value: 'Module' }));

const ComponentNode = createComponent({
  factory(result, { treeNode }) {
    if (treeNode.type === "text") return renderTemplate`${treeNode.content}`;
    const slots = {
      default: () => renderTemplate`${treeNode.children.map(
        (child) => renderComponent(result, "ComponentNode", ComponentNode, { treeNode: child })
      )}`
    };
    if (treeNode.type === "component") {
      let styles = "", links = "", scripts = "";
      if (Array.isArray(treeNode.collectedStyles)) {
        styles = treeNode.collectedStyles.map(
          (style) => renderUniqueStylesheet(result, {
            type: "inline",
            content: style
          })
        ).join("");
      }
      if (Array.isArray(treeNode.collectedLinks)) {
        links = treeNode.collectedLinks.map((link) => {
          return renderUniqueStylesheet(result, {
            type: "external",
            src: link[0] === "/" ? link : "/" + link
          });
        }).join("");
      }
      if (Array.isArray(treeNode.collectedScripts)) {
        scripts = treeNode.collectedScripts.map((script) => renderScriptElement(script)).join("");
      }
      const head = unescapeHTML(styles + links + scripts);
      let headAndContent = createHeadAndContent(
        head,
        renderTemplate`${renderComponent(
          result,
          treeNode.component.name,
          treeNode.component,
          treeNode.props,
          slots
        )}`
      );
      result._metadata.propagators.add({
        init() {
          return headAndContent;
        }
      });
      return headAndContent;
    }
    return renderComponent(result, treeNode.tag, treeNode.tag, treeNode.attributes, slots);
  },
  propagation: "self"
});
async function createTreeNode(node) {
  if (isHTMLString(node)) {
    return { type: "text", content: node };
  } else if (typeof node === "string" || typeof node === "number") {
    return { type: "text", content: String(node) };
  } else if (node === null || typeof node !== "object" || !Markdoc.Tag.isTag(node)) {
    return { type: "text", content: "" };
  }
  const children = await Promise.all(node.children.map((child) => createTreeNode(child)));
  if (typeof node.name === "function") {
    const component = node.name;
    const props = node.attributes;
    return {
      type: "component",
      component,
      props,
      children
    };
  } else if (isPropagatedAssetsModule(node.name)) {
    const { collectedStyles, collectedLinks, collectedScripts } = node.name;
    const component = (await node.name.getMod()).default;
    const props = node.attributes;
    return {
      type: "component",
      component,
      collectedStyles,
      collectedLinks,
      collectedScripts,
      props,
      children
    };
  } else {
    return {
      type: "element",
      tag: node.name,
      attributes: node.attributes,
      children
    };
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

const $$Astro = createAstro("https://alt-del-code.github.io");
const $$Renderer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Renderer;
  //! astro-head-inject
  const { stringifiedAst, config } = Astro2.props;
  const ast = Markdoc.Ast.fromJSON(stringifiedAst);
  const content = await Markdoc.transform(ast, config);
  return renderTemplate`${Array.isArray(content) ? content.map(async (c) => renderTemplate`${renderComponent($$result, "ComponentNode", ComponentNode, { "treeNode": await createTreeNode(c) })}`) : renderTemplate`${renderComponent($$result, "ComponentNode", ComponentNode, { "treeNode": await createTreeNode(content) })}`}`;
}, "D:/krrish/v3/node_modules/@astrojs/markdoc/components/Renderer.astro", void 0);

class MarkdocError extends Error {
  loc;
  title;
  hint;
  frame;
  type = "MarkdocError";
  constructor(props, ...params) {
    super(...params);
    const { title = "MarkdocError", message, stack, location, hint, frame } = props;
    this.title = title;
    if (message) this.message = message;
    this.stack = stack ? stack : this.stack;
    this.loc = location;
    this.hint = hint;
    this.frame = frame;
  }
}

function getSlug(attributes, children, headingSlugger) {
  if (attributes.id && typeof attributes.id === "string") {
    return attributes.id;
  }
  const textContent = attributes.content ?? getTextContent(children);
  let slug = headingSlugger.slug(textContent);
  if (slug.endsWith("-")) slug = slug.slice(0, -1);
  return slug;
}
const heading = {
  children: ["inline"],
  attributes: {
    id: { type: String },
    level: { type: Number, required: true, default: 1 }
  },
  transform(node, config) {
    const { level, ...attributes } = node.transformAttributes(config);
    const children = node.transformChildren(config);
    if (!config.ctx?.headingSlugger) {
      throw new MarkdocError({
        message: "Unexpected problem adding heading IDs to Markdoc file. Did you modify the `ctx.headingSlugger` property in your Markdoc config?"
      });
    }
    const slug = getSlug(attributes, children, config.ctx.headingSlugger);
    const render = config.nodes?.heading?.render ?? `h${level}`;
    const tagProps = (
      // For components, pass down `level` as a prop,
      // alongside `__collectHeading` for our `headings` collector.
      // Avoid accidentally rendering `level` as an HTML attribute otherwise!
      typeof render === "string" ? { ...attributes, id: slug } : { ...attributes, id: slug, __collectHeading: true, level }
    );
    return new Markdoc.Tag(render, tagProps, children);
  }
};
function setupHeadingConfig() {
  const headingSlugger = new Slugger();
  return {
    ctx: {
      headingSlugger
    },
    nodes: {
      heading
    }
  };
}

async function setupConfig(userConfig = {}, options) {
  let defaultConfig = setupHeadingConfig();
  if (userConfig.extends) {
    for (let extension of userConfig.extends) {
      if (extension instanceof Promise) {
        extension = await extension;
      }
      defaultConfig = mergeConfig(defaultConfig, extension);
    }
  }
  let merged = mergeConfig(defaultConfig, userConfig);
  return merged;
}
function setupConfigSync(userConfig = {}, options) {
  const defaultConfig = setupHeadingConfig();
  let merged = mergeConfig(defaultConfig, userConfig);
  return merged;
}
function mergeConfig(configA, configB) {
  return {
    ...configA,
    ...configB,
    ctx: {
      ...configA.ctx,
      ...configB.ctx
    },
    tags: {
      ...configA.tags,
      ...configB.tags
    },
    nodes: {
      ...configA.nodes,
      ...configB.nodes
    },
    functions: {
      ...configA.functions,
      ...configB.functions
    },
    variables: {
      ...configA.variables,
      ...configB.variables
    },
    partials: {
      ...configA.partials,
      ...configB.partials
    },
    validation: {
      ...configA.validation,
      ...configB.validation
    }
  };
}
function resolveComponentImports(markdocConfig, tagComponentMap, nodeComponentMap) {
  for (const [tag, render] of Object.entries(tagComponentMap)) {
    const config = markdocConfig.tags[tag];
    if (config) config.render = render;
  }
  for (const [node, render] of Object.entries(nodeComponentMap)) {
    const config = markdocConfig.nodes[node];
    if (config) config.render = render;
  }
  return markdocConfig;
}
function getTextContent(childNodes) {
  let text = "";
  for (const node of childNodes) {
    if (typeof node === "string" || typeof node === "number") {
      text += node;
    } else if (typeof node === "object" && Markdoc.Tag.isTag(node)) {
      text += getTextContent(node.children);
    }
  }
  return text;
}
const headingLevels = [1, 2, 3, 4, 5, 6];
function collectHeadings(children, collectedHeadings) {
  for (const node of children) {
    if (typeof node !== "object" || !Markdoc.Tag.isTag(node)) continue;
    if (node.attributes.__collectHeading === true && typeof node.attributes.level === "number") {
      collectedHeadings.push({
        slug: node.attributes.id,
        depth: node.attributes.level,
        text: getTextContent(node.children)
      });
      continue;
    }
    for (const level of headingLevels) {
      if (node.name === "h" + level) {
        collectedHeadings.push({
          slug: node.attributes.id,
          depth: level,
          text: getTextContent(node.children)
        });
      }
    }
    collectHeadings(node.children, collectedHeadings);
  }
}
function createGetHeadings(stringifiedAst, userConfig, options) {
  return function getHeadings() {
    const config = setupConfigSync(userConfig);
    const ast = Markdoc.Ast.fromJSON(stringifiedAst);
    const content = Markdoc.transform(ast, config);
    let collectedHeadings = [];
    collectHeadings(Array.isArray(content) ? content : [content], collectedHeadings);
    return collectedHeadings;
  };
}
function createContentComponent(Renderer, stringifiedAst, userConfig, options, tagComponentMap, nodeComponentMap) {
  return createComponent({
    async factory(result, props) {
      const withVariables = mergeConfig(userConfig, { variables: props });
      const config = resolveComponentImports(
        await setupConfig(withVariables),
        tagComponentMap,
        nodeComponentMap
      );
      return renderComponent(result, Renderer.name, Renderer, { stringifiedAst, config }, {});
    },
    propagation: "self"
  });
}

const assetsConfig = {
  nodes: {
    image: {
      attributes: {
        ...Markdoc.nodes.image.attributes,
        __optimizedSrc: { type: "Object" }
      },
      transform(node, config) {
        const attributes = node.transformAttributes(config);
        const children = node.transformChildren(config);
        if (node.type === "image" && "__optimizedSrc" in node.attributes) {
          const { __optimizedSrc, ...rest } = node.attributes;
          return new Markdoc.Tag($$Image, { ...rest, src: __optimizedSrc }, children);
        } else {
          return new Markdoc.Tag("img", attributes, children);
        }
      }
    }
  }
};

const frontmatter$4 = {
  "title": "industrial-supply",
  "image": "/src/assets/images/slide-2/image.png",
  "serviceTitle": "Industrial Supply",
  "serviceDescription": "Comprehensive range of industrial materials and components for manufacturing needs",
  "icon": "lucide:boxes",
  "link": "/services/supply",
  "order": 2
};
function getHeadings$4() {
  return [];
}
const __usesAstroImage$4 = true;
function _createMdxContent$4(props) {
  const _components = {
    li: "li",
    p: "p",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "We supply a wide range of industrial materials:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Raw Materials"
      }), "\n", createVNode(_components.li, {
        children: "Industrial Components"
      }), "\n", createVNode(_components.li, {
        children: "Manufacturing Supplies"
      }), "\n", createVNode(_components.li, {
        children: "Custom Orders"
      }), "\n"]
    })]
  });
}
function MDXContent$4(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent$4, {
      ...props
    })
  }) : _createMdxContent$4(props);
}

const url$4 = "src/content/hero-slides/slide-2.mdx";
const file$4 = "D:/krrish/v3/src/content/hero-slides/slide-2.mdx";
const Content$4 = (props = {}) => MDXContent$4({
  ...props,
  components: { Fragment: Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
});
Content$4[Symbol.for('mdx-component')] = true;
Content$4[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$4.layout);
Content$4.moduleId = "D:/krrish/v3/src/content/hero-slides/slide-2.mdx";
__astro_tag_component__(Content$4, 'astro:jsx');

const slide2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$4,
  __usesAstroImage: __usesAstroImage$4,
  default: Content$4,
  file: file$4,
  frontmatter: frontmatter$4,
  getHeadings: getHeadings$4,
  url: url$4
}, Symbol.toStringTag, { value: 'Module' }));

const frontmatter$3 = {
  "title": "precision-fabrication",
  "image": "/src/assets/images/slide-1/image.png",
  "serviceTitle": "Precision Fabrication",
  "serviceDescription": "Custom metal fabrication with state-of-the-art machinery and expert craftsmanship",
  "icon": "lucide:settings-2",
  "link": "/services/fabrication",
  "order": 1
};
function getHeadings$3() {
  return [];
}
const __usesAstroImage$3 = true;
function _createMdxContent$3(props) {
  const _components = {
    li: "li",
    p: "p",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "Our precision fabrication services include:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "CNC Machining"
      }), "\n", createVNode(_components.li, {
        children: "Sheet Metal Work"
      }), "\n", createVNode(_components.li, {
        children: "Custom Fabrication"
      }), "\n", createVNode(_components.li, {
        children: "Quality Assurance"
      }), "\n"]
    })]
  });
}
function MDXContent$3(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent$3, {
      ...props
    })
  }) : _createMdxContent$3(props);
}

const url$3 = "src/content/hero-slides/slide-1.mdx";
const file$3 = "D:/krrish/v3/src/content/hero-slides/slide-1.mdx";
const Content$3 = (props = {}) => MDXContent$3({
  ...props,
  components: { Fragment: Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
});
Content$3[Symbol.for('mdx-component')] = true;
Content$3[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$3.layout);
Content$3.moduleId = "D:/krrish/v3/src/content/hero-slides/slide-1.mdx";
__astro_tag_component__(Content$3, 'astro:jsx');

const slide1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$3,
  __usesAstroImage: __usesAstroImage$3,
  default: Content$3,
  file: file$3,
  frontmatter: frontmatter$3,
  getHeadings: getHeadings$3,
  url: url$3
}, Symbol.toStringTag, { value: 'Module' }));

const frontmatter$2 = {
  "title": "hardware-solutions",
  "image": "/src/assets/images/slide3.jpg",
  "serviceTitle": "Hardware Solutions",
  "serviceDescription": "Quality hardware products and customized solutions for industrial applications",
  "icon": "lucide:wrench",
  "link": "/services/hardware",
  "order": 3
};
function getHeadings$2() {
  return [];
}
const __usesAstroImage$2 = true;
function _createMdxContent$2(props) {
  const _components = {
    li: "li",
    p: "p",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "Our hardware solutions include:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Industrial Hardware"
      }), "\n", createVNode(_components.li, {
        children: "Custom Components"
      }), "\n", createVNode(_components.li, {
        children: "Specialized Tools"
      }), "\n", createVNode(_components.li, {
        children: "Technical Support"
      }), "\n"]
    })]
  });
}
function MDXContent$2(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent$2, {
      ...props
    })
  }) : _createMdxContent$2(props);
}

const url$2 = "src/content/hero-slides/slide-3.mdx";
const file$2 = "D:/krrish/v3/src/content/hero-slides/slide-3.mdx";
const Content$2 = (props = {}) => MDXContent$2({
  ...props,
  components: { Fragment: Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
});
Content$2[Symbol.for('mdx-component')] = true;
Content$2[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$2.layout);
Content$2.moduleId = "D:/krrish/v3/src/content/hero-slides/slide-3.mdx";
__astro_tag_component__(Content$2, 'astro:jsx');

const slide3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$2,
  __usesAstroImage: __usesAstroImage$2,
  default: Content$2,
  file: file$2,
  frontmatter: frontmatter$2,
  getHeadings: getHeadings$2,
  url: url$2
}, Symbol.toStringTag, { value: 'Module' }));

const frontmatter$1 = {
  "title": "technical-expertise",
  "image": "/src/assets/images/slide4.jpg",
  "serviceTitle": "Technical Expertise",
  "serviceDescription": "15+ years of technical excellence in manufacturing and fabrication services",
  "icon": "lucide:award",
  "link": "/services/expertise",
  "order": 4
};
function getHeadings$1() {
  return [];
}
const __usesAstroImage$1 = true;
function _createMdxContent$1(props) {
  const _components = {
    li: "li",
    p: "p",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "Our technical expertise covers:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Manufacturing Excellence"
      }), "\n", createVNode(_components.li, {
        children: "Quality Control"
      }), "\n", createVNode(_components.li, {
        children: "Process Optimization"
      }), "\n", createVNode(_components.li, {
        children: "Industry Best Practices"
      }), "\n"]
    })]
  });
}
function MDXContent$1(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent$1, {
      ...props
    })
  }) : _createMdxContent$1(props);
}

const url$1 = "src/content/hero-slides/slide-4.mdx";
const file$1 = "D:/krrish/v3/src/content/hero-slides/slide-4.mdx";
const Content$1 = (props = {}) => MDXContent$1({
  ...props,
  components: { Fragment: Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
});
Content$1[Symbol.for('mdx-component')] = true;
Content$1[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$1.layout);
Content$1.moduleId = "D:/krrish/v3/src/content/hero-slides/slide-4.mdx";
__astro_tag_component__(Content$1, 'astro:jsx');

const slide4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$1,
  __usesAstroImage: __usesAstroImage$1,
  default: Content$1,
  file: file$1,
  frontmatter: frontmatter$1,
  getHeadings: getHeadings$1,
  url: url$1
}, Symbol.toStringTag, { value: 'Module' }));

const frontmatter = {
  "title": "Industrial Excellence in Fabrication & Supply",
  "subtitle": "15+ Years of Precision Manufacturing",
  "description": "Your trusted partner in industrial fabrication, material supply, and hardware solutions. Based in Hosur, Tamil Nadu, delivering excellence across India.",
  "ctaText": "Request a Quote",
  "ctaLink": "/contact",
  "stats": {
    "projects": "500+",
    "clients": "200+",
    "experience": "15+"
  }
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "welcome-to-krrish-co",
    "text": "Welcome to Krrish Co"
  }, {
    "depth": 2,
    "slug": "our-commitment",
    "text": "Our Commitment"
  }];
}
const __usesAstroImage = true;
function _createMdxContent(props) {
  const _components = {
    h1: "h1",
    h2: "h2",
    li: "li",
    p: "p",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "welcome-to-krrish-co",
      children: "Welcome to Krrish Co"
    }), "\n", createVNode(_components.p, {
      children: "We specialize in precision manufacturing and industrial solutions, serving businesses across India with excellence and innovation."
    }), "\n", createVNode(_components.h2, {
      id: "our-commitment",
      children: "Our Commitment"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "ISO 9001:2015 Certified"
      }), "\n", createVNode(_components.li, {
        children: "Made in India"
      }), "\n", createVNode(_components.li, {
        children: "15+ Years of Experience"
      }), "\n", createVNode(_components.li, {
        children: "Pan-India Service Network"
      }), "\n"]
    })]
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}

const url = "src/content/hero/main.mdx";
const file = "D:/krrish/v3/src/content/hero/main.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "D:/krrish/v3/src/content/hero/main.mdx";
__astro_tag_component__(Content, 'astro:jsx');

const main = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content,
  __usesAstroImage,
  default: Content,
  file,
  frontmatter,
  getHeadings,
  url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Image as $, VALID_INPUT_FORMATS as V, _astro_assets as _, isRemotePath as a, isRemoteAllowed as b, appendForwardSlash as c, removeTrailingForwardSlash as d, slash as e, fileExtension as f, getConfiguredImageService as g, baseService as h, imageConfig as i, joinPaths as j, parseQuality as k, assetsConfig as l, createGetHeadings as m, createContentComponent as n, $$Renderer as o, prependForwardSlash as p, slide2$1 as q, removeBase as r, server_default as s, trimSlashes as t, slide1$1 as u, slide3$1 as v, slide4$1 as w, main$1 as x };
