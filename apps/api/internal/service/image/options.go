package image

import "contrib.rocks/libs/go/renderer"

const (
	defaultMaxCount = 100
	defaultColumns  = 12
	defaultItemSize = 64
)

func normalizeRendererOptions(options *renderer.RendererOptions) *renderer.RendererOptions {
	if options.MaxCount < 1 {
		options.MaxCount = defaultMaxCount
	}
	if options.Columns < 1 {
		options.Columns = defaultColumns
	}
	if options.ItemSize < 1 {
		options.ItemSize = defaultItemSize
	}
	return options
}
