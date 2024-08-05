CREATE TABLE [dbo].[Buy_Ord_Img]
(
	[Imgno] [int] IDENTITY(1,1) NOT NULL primary key,
	[Order_no] [varchar](20) NULL,
	[StyleRowid] [int] NULL,
	[Imgpath] [varchar](200) NULL,
	[Imgdesc] [varchar](200) NULL,
	[Imgtitle] [varchar](25) NULL,

	CONSTRAINT [FK_StyleRowItemImg] FOREIGN KEY ([StyleRowId]) REFERENCES [buy_ord_style]([StyleRowid]),
)
