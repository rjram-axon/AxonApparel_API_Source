CREATE TABLE [dbo].[MarkEnqEmbPrint]
(
	[MarkEnqEmbPrintId] [int] IDENTITY(1,1) NOT NULL,
	[EnquiryID] [int] NOT NULL,
	[EmbDesc] [varchar](250) NULL,
	[EmbSize] [varchar](50) NULL,
	[EmbPlacement] [varchar](50) NULL,
	[EmbColors] [int] NULL,
	[EmbStiches] [int] NULL,
	[EmbType] [varchar](3) NULL,
	[PrnDesc] [varchar](250) NULL,
	[PrnSize] [varchar](50) NULL,
	[PrnPlacement] [varchar](50) NULL,
	[PrnColors] [int] NULL,
	[PrnType] [int] NULL,
	[PrnQlty] [int] NULL,
	[EmbNo] [varchar](12) NULL,
	[PrnNo] [varchar](12) NULL,
	[EmbImage] [varchar](50) NULL,
	[PrintImage] [varchar](50) NULL, 
    CONSTRAINT [PK_MarkEnqEmbPrint] PRIMARY KEY ([MarkEnqEmbPrintId]), 
    CONSTRAINT [CK_MarkEnqEmbPrint_EmbType] CHECK (([EmbType] = 'MAC' or [EmbType] = 'MAN')),
	CONSTRAINT [FK_MarkEnqEmbPrint_MarkEnqMas] FOREIGN KEY ([EnquiryID]) REFERENCES [MarkEnqMas]([EnquiryID])
)
