CREATE TABLE [dbo].[TermDet]
(
	[TermDetId] [int] IDENTITY(1,1) NOT NULL primary key,
	[Termid] [int] NULL,
	[TemplateName] [varchar](200) NULL,
	[TermDesc] [varchar](500) NULL, 
	[TemplateNameMasId] [int],
    CONSTRAINT [FK_TermDet_TermMas] FOREIGN KEY ([Termid]) REFERENCES [TermMas]([Termid])
)
