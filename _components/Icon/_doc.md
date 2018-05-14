# {{ page.component.name }}
{% assign types = "mail twitter facebook github youtube patreon play pause" | split: " " %}
{% assign colors = "default white" | split: " " %}

found in source at: {{ page.component.path }}


## Usage

{% raw %}
  {% block Icon type="type" color="color" %}
{% endraw %}

*type* [required] The type of icon to be rendered. (defaults to: "{{ types | first }}")

*color* [optional] The color the icon is rendered in. "default" renders icons in their *natural* colors, i.e. in the case of a company logo it will be rendered in the company's colors. (defaults to: "{{ colors | first }}")


## Variations

{% for type in types %}
### {{type | capitalize }}

{% for color in colors %}
  <section>
    <p>
      {% block Icon type=type color=color %}
    </p>

    <p>
      Usage:
      {%- highlight liquid -%}
        {%raw%}{%{%endraw%} block Icon type="{{ type }}" color="{{ color }}" %}
      {%- endhighlight -%}
    </p>
  </section>
{% endfor %}
{% endfor %}