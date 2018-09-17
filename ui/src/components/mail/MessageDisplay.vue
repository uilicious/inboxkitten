<template>
	<div class="message-display">

		<div class="message-header">
			<table>
				<tr>
					<th>Subject:</th>
					<td>{{emailContent.subject}}</td>
				</tr>
				<tr>
					<th>From:</th>
					<td>{{emailContent.from}}</td>
				</tr>
				<tr>
					<th>To:</th>
					<td>{{emailContent.recipients}}</td>
				</tr>
				<tr>
					<th>Date:</th>
					<td>{{emailContent.Date}}</td>
				</tr>
			</table>
		</div>
		<iframe id="message-content"></iframe>
		<p v-if="emailContent.subject === undefined" class="no-message">Click on any of the message on the left to see its content</p>

	</div>

</template>

<script>
export default {
	name: 'message-display',
	props: ['emailContent'],
	mounted () {
		this.$eventHub.$on('iframe_content', this.formatHtml)
	},
	beforeDestroy () {
		this.$eventHub.$off('iframe_content', this.formatHtml)
	},
	methods: {
		formatHtml (content) {
			let iframe = document.getElementById('message-content')
			let html = content
			iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(html)
		}
	}
}
</script>

<style lang="scss" rel="stylesheet/scss">
	#message-content {
		height: 80%;
		width: 100%;
		overflow: auto;
		border: 0;
	}
	.message-header {
		height:160px;
		margin-top: 1rem;
		margin-left:2rem;
		margin-right:2rem;
		border-bottom: 1px solid lightgrey;
	}
	.message-display {
		height: 100%;
		width: 100%;
		overflow: hidden;
		display:flex;
		flex-direction: column;
	}

	.no-message {
		position:relative;
		bottom: 40%;
	}

	th {
		text-align: right;
		padding-right: 0.5rem;
		height: 2rem;
	}

	td {
		text-align: left;
		padding-left: 0.5rem;
		height: 2rem;
	}
</style>
