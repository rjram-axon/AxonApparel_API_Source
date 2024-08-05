CREATE TABLE [dbo].[buyordapptitle](
	[TitleId] [int] IDENTITY(1,1) NOT NULL,
	[order_no] [varchar](50) NULL,
	[styleid] [int] NULL,
	[Approvalid] [int] NULL,
	[ordertype] [char](1) NOT NULL,
 CONSTRAINT [pk_titleid] PRIMARY KEY NONCLUSTERED 
(
	[TitleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO



ALTER TABLE [dbo].[buyordapptitle] ADD  CONSTRAINT [def_ordertype]  DEFAULT ('B') FOR [ordertype]
GO

ALTER TABLE [dbo].[buyordapptitle]  WITH NOCHECK ADD  CONSTRAINT [fk_buyordapptitle_approvalid] FOREIGN KEY([Approvalid])
REFERENCES [dbo].[Approval] ([ApprovalId])
GO

ALTER TABLE [dbo].[buyordapptitle] CHECK CONSTRAINT [fk_buyordapptitle_approvalid]
GO

ALTER TABLE [dbo].[buyordapptitle]  WITH CHECK ADD  CONSTRAINT [fk_buyordapptitle_styleid] FOREIGN KEY([styleid])
REFERENCES [dbo].[StyleHeader] ([StyleId])
GO

ALTER TABLE [dbo].[buyordapptitle] CHECK CONSTRAINT [fk_buyordapptitle_styleid]
GO

